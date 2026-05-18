import axios from "axios";

const analyzeSymptoms = async (symptoms) => {

    try {

        const response = await axios.post(

            "https://api.groq.com/openai/v1/chat/completions",

            {
                model: "llama-3.3-70b-versatile",

                response_format: {
                    type: "json_object"
                },

                messages: [

                    {
                        role: "system",

                        content: `
You are an AI medical assistant.

Analyze symptoms carefully.

Return ONLY valid JSON.

Required format:

{
  "disease": "",
  "severity": "",
  "precautions": [],
  "specialist": ""
}

Rules:
- severity must be:
  Mild
  Moderate
  Severe

- precautions must be array

- specialist must contain ONLY ONE specialist

Allowed specialists:
Cardiologist
Neurologist
Pulmonologist
Dermatologist
General Physician
Orthopedic
ENT Specialist
Psychiatrist
Gastroenterologist
`
                    },

                    {
                        role: "user",

                        content: symptoms
                    }
                ]
            },

            {
                headers: {

                    Authorization:
                    `Bearer ${process.env.GROQ_API_KEY}`,

                    "Content-Type":
                    "application/json"
                }
            }
        );

        return response.data
            .choices[0]
            .message.content;

    } catch (error) {

        console.log(
            "AI SERVICE ERROR:"
        );

        console.log(
            error.response?.data ||
            error.message
        );

        throw new Error(
            "AI Analysis Failed"
        );
    }
};

export default analyzeSymptoms;