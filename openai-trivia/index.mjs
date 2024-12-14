import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export const handler = async (event) => {
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Generate 10 trivia questions with 4 options each. Format as an array of JSON objects.",
      },
    ],
    temperature: 0.7,
  };

  try {
    const response = await openai.createChatCompletion(payload);
    const triviaQuestions = JSON.parse(response.data.choices[0].message.content);

    return {
      statusCode: 200,
      body: JSON.stringify(
        triviaQuestions.map((q, index) => ({
          QuestionID: (index + 1).toString(),
          ...q,
        }))
      ),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
