import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User.js";


// REGISTER USER

export const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            gender,
            age
        } = req.body;

         if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                "Please fill all required fields"
            });
        }

        // check existing user
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword =
        await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            gender
        });

        const token =
        jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                age: user.age,

                gender: user.gender
            },

            token
        });
    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};



// LOGIN USER

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // find user
        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // compare password
        const isMatch =
        await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // generate token
        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }
        );

        res.json({

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};



// GET PROFILE

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.id
        ).select("-password");

        res.json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};