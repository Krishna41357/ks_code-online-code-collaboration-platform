import Groq from "groq-sdk"

import dotenv from "dotenv";
dotenv.config();

console.log("GROQ API KEY:", process.env.GROQ_API_KEY);

const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY
});
export const errorAnalyzingController = async(req , res) =>{
    try{
        const{error , code , language} = req.body;
        if(!error || !code){
            return res.status(400).json({
                success: false,
                message: 'No error'
            });
        }
        const analysis = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  n: 2, // 👈 important
  messages: [
    {
      role: "system",
      content: `
You are a competitive programming assistant.

Rules:
- Be concise.
- Focus only on the real cause of the error.
- Do not over-explain.
`
    },
    {
      role: "user",
      content: `
Language: ${language || "unknown"}
Error:
${error}

Code:
${code}

Task:
1. Explain the error briefly.
2. Provide the fully corrected code.
`
    }
  ],
  temperature: 0.3,
});

// Parse the JSON returned by the model
const Explanation = analysis.choices[0].message.content.trim();
const correctedCode = analysis.choices[1].message.content.trim();

return res.status(200).json({
    success: true,
    Explanation,
    correctedCode
});

    } catch(err){
        console.error("AI Error Analyzer:", err);
        return res.status(500).json({
      success: false,
      message: "Failed to analyze error"
    });
    }
}