import jwt from "jsonwebtoken";

const auth = (
    req,
    res,
    next
) => {

    const authHeader =
    req.headers.authorization;

    // No header

    if (!authHeader) {

        return res.status(401).json({

            message:
            "No token"
        });
    }

    try {

        // Remove "Bearer "

        const token =
        authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                message:
                "Invalid token"
            });
        }

        // Verify token

        const decoded =
        jwt.verify(

            token,

            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({

            message:
            "Invalid token"
        });
    }
};

export default auth;