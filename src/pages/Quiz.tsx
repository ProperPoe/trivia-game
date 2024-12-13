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
  "cognito:username"?: string;
  email?: string;
  [key: string]: any;
}

const QUIZ_API_URL = "https://r93ynamaqb.execute-api.us-east-2.amazonaws.com/Leaderboard";

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15); // Timer state
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

  useEffect(() => {
    // Timer logic
    if (timeLeft <= 0) {
      handleTimeout(); // Handle timeout when time runs out
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or question change
  }, [timeLeft]);

  const handleTimeout = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex <= questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimeLeft(15); // Reset timer for the next question
    } else {
      handleSubmitScore(); // Submit score when quiz ends
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (answer === questions[currentQuestionIndex].Answer) {
      setScore(score + 1);
    }
    handleTimeout(); // Move to the next question or end quiz
  };

  const handleSubmitScore = async () => {
    const profile = auth.user?.profile as CognitoUserProfile;
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
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
        credentials: "include",
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

    navigate("/leaderboard");
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
      <h2>Time Left: {timeLeft} seconds</h2>
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
