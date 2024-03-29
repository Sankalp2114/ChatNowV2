import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import helmet from "helmet";
import morgan from "morgan";
import genAiRoutes from "./routes/googleAi.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

const configuration = {
  apikey: process.env.API_KEY,
};
// Access your API key as an environment variable (see "Set up your API key" above)
export const genAI = new GoogleGenerativeAI(configuration.apikey);
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.use("/genAi", genAiRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on PORT= ${PORT}`);
});
