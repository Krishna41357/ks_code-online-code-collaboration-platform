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
            model:"gpt-4-groq",
            messages:[
                {
                role:"system",
                content:"You are a competitive programming assistant. Explain errors clearly and suggest fixes.",
                },
                {
                    role:"user",
                    content:`Language:${language || "unknown"}  Error:${error} Code:${code} Explain the error and suggest a fix.`
                }
            ], temperature:0.3
        }) 
        const Explanation = analysis.choices[0].message.content // taking only content
        return res.status(200).json({
            success:true,
            Explanation
        })
    } catch(err){
        console.error("AI Error Analyzer:", err);
        return res.status(500).json({
      success: false,
      message: "Failed to analyze error"
    });
    }
}