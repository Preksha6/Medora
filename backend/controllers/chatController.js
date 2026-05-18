import Chat from "../models/Chat.js";

import analyzeSymptoms
from "../services/aiService.js";

import getDoctors
from "../services/doctorService.js";



// SEND MESSAGE + AI ANALYSIS

export const sendMessage = async (
    req,
    res
) => {

    try {

        const { symptoms } = req.body;

        if (!symptoms) {

            return res.status(400).json({

                message:
                "Symptoms required"
            });
        }

        // AI Analysis

        // Parse JSON response

        const aiRaw =
        await analyzeSymptoms(symptoms);

        const aiReply =
        JSON.parse(aiRaw);
        // Extract specialist directly

        const specialist =
        aiReply.specialist ||
        "General Physician";

        // Fetch real doctors

        const doctors =
        await getDoctors(
            specialist
        );
        console.log(aiReply);
console.log(doctors);
        // Save chat history

        const chat =
        await Chat.create({

            userId: req.user.id,

            symptoms,

            aiResponse: aiReply,

            recommendedDoctors:
            doctors
        });

        // Final response

        res.json({

            _id: chat._id,

            symptoms:
            chat.symptoms,

            aiResponse:
            chat.aiResponse,

            createdAt:
            chat.createdAt,

            recommendedDoctors:
            doctors
        });

    } catch (error) {

        console.log(
            "CHAT ERROR:"
        );

        console.log(error);

        res.status(500).json({

            message:
            error.message ||
            "Server Error"
        });
    }
};



// ANALYSIS HISTORY

export const getHistory = async (
    req,
    res
) => {

    try {

        const history =
        await Chat.find({

            userId:
            req.user.id

        }).sort({

            createdAt: -1
        });

        res.json(history);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
            "Failed to fetch history"
        });
    }
};

export const deleteHistory = async (
    req,
    res
) => {

    try {

        const chat =
        await Chat.findOne({

            _id: req.params.id,

            userId: req.user.id
        });

        if (!chat) {

            return res.status(404).json({

                message:
                "History not found"
            });
        }

        await Chat.findByIdAndDelete(
            req.params.id
        );

        res.json({

            message:
            "History deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
            "Delete failed"
        });
    }
};

export const clearHistory = async (
    req,
    res
) => {

    try {

        await Chat.deleteMany({

            userId:
            req.user.id
        });

        res.json({

            message:
            "All history deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
            "Failed to clear history"
        });
    }
};