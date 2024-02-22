import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import helmet from "helmet";
import morgan from "morgan";
import genAiRoutes from "./routes/googleAi";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

const configuration = new Configuration({
  apikey: process.env.API_KEY,
});
// Access your API key as an environment variable (see "Set up your API key" above)
export const genAI = new GoogleGenerativeAI(configuration);

app.use("/genAi", genAiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on PORT= ${PORT}`);
});
