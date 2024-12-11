import React, { useState, useEffect, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Button from '../components/Button';

const API_URL = "https://pn39j08p5f.execute-api.us-east-2.amazonaws.com/GetTriviaQuestions";

export default function Quiz() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
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
      console.log(`Game over! Final score: ${score}`);
    }
  };

  if (loading) {
    return (
      <div style={outerContainerStyle}>
        <div style={innerContainerStyle}>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={outerContainerStyle}>
        <div style={innerContainerStyle}>
          <p>Error: {error}</p>
          <Button text="Back to Home" onClick={() => navigate('/')} />
        </div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div style={outerContainerStyle}>
        <div style={innerContainerStyle}>
          <h1>Game Over!</h1>
          <p>Your final score: {score}</p>
          <Button text="Back to Home" onClick={() => navigate('/')} />
        </div>
      </div>
    );
  }

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <QuestionCard
          question={questions[currentQuestionIndex].Question}
          answers={questions[currentQuestionIndex].Options}
          onAnswerClick={handleAnswerClick}
        />
        <div style={{ marginTop: '20px' }}>
          <Button text="Back to Home" onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
}

const outerContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  backgroundColor: '#f9f9f9',
};

const innerContainerStyle: CSSProperties = {
  textAlign: 'center',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  width: '90%',
};
