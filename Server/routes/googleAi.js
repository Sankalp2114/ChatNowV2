import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { genAI } from "../index";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    console.log(text);
    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
