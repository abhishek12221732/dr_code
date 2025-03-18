const axios = require("axios");
require("dotenv").config();

const getLeadScore = async (lead) => {
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "gpt-3.5-turbo",
            prompt: `Score this lead based on priority (1-100): ${JSON.stringify(lead)}`,
            max_tokens: 10
        }, {
            headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        return parseInt(response.data.choices[0].text.trim()) || 50;
    } catch (error) {
        console.error("AI Scoring Error:", error);
        return 50; // Default score if AI fails
    }
};

module.exports = { getLeadScore };
