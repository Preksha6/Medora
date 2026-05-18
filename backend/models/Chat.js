import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    symptoms: String,

    aiResponse: {
        type: Object,
        required: true
    },

    recommendedDoctors: [
        {
            name: String,
            specialty: String,
            hospital: String,
            address: String,
            phone: String,
            lat: String,
            lon: String
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;