const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config(); // Load .env variables

const app = express();
// ✅ Allow frontend requests from http://localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // Ensure JSON requests are handled

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

app.get("/test", (req, res) => {
    console.log("Received request");
    res.json({message:"Test received"});
})

// ✅ Ensure the /chat route is properly defined
app.post("/chat", async (req, res) => {
    console.log("Received chat request!:", req.body);
    try {
        const { message } = req.body; // Extract user input from request

        if (!message) {
            return res.status(400).json({ error: "No message provided" });
        }

        // ✅ Correct OpenAI API call
        const response = await openai.chat.completions.create({
            model: "gpt-4", // Specify GPT model
            messages: [{ role: "user", content: message }],
        });


   
        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("Error processing AI request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Ensure the server is running on the correct port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
