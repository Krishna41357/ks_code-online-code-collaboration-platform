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
Explain the error briefly.
Then provide the full corrected code.
Respond in this format:

EXPLANATION:
<short explanation>

CORRECTED_CODE:
<full corrected code>
`
    },
    {
      role: "user",
      content: `
Language: ${language}
Error:
${error}

Code:
${code}
`
    }
  ],
  temperature: 0.2
});


// Parse the JSON returned by the model
const content = analysis.choices[0].message.content;

let explanation = "";
let correctedCode = "";

if (content.includes("CORRECTED_CODE:")) {
  const parts = content.split("CORRECTED_CODE:");
  explanation = parts[0].replace("EXPLANATION:", "").trim();
  correctedCode = parts[1].trim();
} else {
  explanation = content;
}

return res.json({
  success: true,
  explanation,
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