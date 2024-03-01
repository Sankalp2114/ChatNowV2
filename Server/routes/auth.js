import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          ProjectID: process.env.PROJECT_ID,
          "user-name": username,
          "user-secret": password,
          "private-key": process.env.PRIVATE_KEY,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post("/signup", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const chatEngineResponse = await axios.post(
//       "https://api.chatengine.io/users/",
//       {
//         username: username,
//         secret: password,
//       },
//       {
//         headers: { "Private-Key": process.env.PRIVATE_KEY },
//       }
//     );

//     res.status(200).json({ response: chatEngineResponse.data });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineUserResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY },
      }
    );

    const userId = chatEngineUserResponse.data.id;

    const newChatResponse = await axios.post(
      "https://api.chatengine.io/chats/",
      {
        users: [userId, "Bard"],
        title: `Bard_Ai_${username}`,
      },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USERNAME,
          "User-Secret": process.env.BOT_USER_SECRET,
          "Content-Type": "application/json",
        },
      }
    );

    let chatId = newChatResponse.data.id;

    const addMemberResponse = await axios.post(
      `https://api.chatengine.io/chats/${chatId}/people/`,
      {
        username: username,
      },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USERNAME,
          "User-Secret": process.env.BOT_USER_SECRET,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      user: chatEngineUserResponse.data,
      chat: newChatResponse.data,
    });
    console.log(newChatResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
