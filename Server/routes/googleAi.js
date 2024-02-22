import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { genAI, model } from "../index.js";
import { ChatSession } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    console.log(text);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = text;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const ans = response.text();

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: ans },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USERNAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
