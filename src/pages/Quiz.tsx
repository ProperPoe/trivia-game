import React, { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

interface Question {
  QuestionID: string;
  Question: string;
  Options: string[];
  Answer: string;
}

interface CognitoUserProfile {
  "cognito:username"?: string; // Optional since it may not always exist
  email?: string; 
  [key: string]: any; 
}

const QUIZ_API_URL = "https://r93ynamaqb.execute-api.us-east-2.amazonaws.com/Leaderboard";

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [authView, SetAuthView] = useState<string>("")
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://pn39j08p5f.execute-api.us-east-2.amazonaws.com/GetTriviaQuestions");
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (answer: string) => {
    if (answer === questions[currentQuestionIndex].Answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      handleSubmitScore(); // Submit score when quiz ends
    }
  };
  console.log(auth.user)
  const handleSubmitScore = async () => {
    const profile = auth.user?.profile as CognitoUserProfile;

    // Access cognito:username safely
    const username = profile["cognito:username"] || "Anonymous";
    const payload = {
      UserID: username,
      Score: score,
    };

    try {

      const response = await fetch(QUIZ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`, // Ensure valid token
        },
        credentials: "include", // Include credentials for Cognito
        body: JSON.stringify(payload),
      });
    
      if (response.ok) {
        console.log("Score submitted successfully!");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to submit score:", errorResponse);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }

    navigate("/leaderboard"); // Navigate to leaderboard after submission
  };

  if (!questions.length) return <div>Loading...</div>;

  if (currentQuestionIndex >= questions.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Game Over!</h1>
        <p>Your final score: {score}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{questions[currentQuestionIndex].Question}</h1>
      {questions[currentQuestionIndex].Options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(option)}
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
