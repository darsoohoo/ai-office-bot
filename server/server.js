import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "user", content: message }],
        });
        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Error communicating with OpenAI" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
