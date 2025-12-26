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
    messages: [
        {
            role: "system",
            content: `
You are a competitive programming assistant.
Provide concise, to-the-point explanations for compilation/runtime errors.
Return a valid JSON object with two fields:
1. "explanation" — a short, crisp explanation of the error and suggested fixes.
2. "correctedCode" — the full corrected code, ready to use.
Do not include extra text outside the JSON object.
`
        },
        {
            role: "user",
            content: `
Language: ${language || "unknown"}
Error: ${error}
Code:
${code}
`
        }
    ],
    temperature: 0.3,
});

// Parse the JSON returned by the model
let Explanation = "", correctedCode = "";
try {
    const parsed = JSON.parse(analysis.choices[0].message.content);
    Explanation = parsed.Explanation || "";
    correctedCode = parsed.correctedCode || "";
} catch (e) {
    // Fallback in case model output is not valid JSON
    Explanation = analysis.choices[0].message.content;
}

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