import express from "express";

import auth
from "../middleware/auth.js";

import {
    sendMessage,
    getHistory,
    deleteHistory,
    clearHistory
}
from "../controllers/chatController.js";


const router =
express.Router();

router.post(
    "/",
    auth,
    sendMessage
);

router.get(
    "/history",
    auth,
    getHistory
);

router.delete(
    "/:id",
    auth,
    deleteHistory
);

router.delete(
    "/",
    auth,
    clearHistory
);

export default router;