import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Button from '../components/Button';

const questions = [
  {
    question: 'What is the capital of France?',
    answers: ['Paris', 'London', 'Rome', 'Berlin'],
    correct: 'Paris',
  },
  {
    question: 'What is 2 + 2?',
    answers: ['3', '4', '5', '6'],
    correct: '4',
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAnswerClick = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex <= questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      console.log(`Game over! Final score: ${score}`);
    }
  };

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
          question={questions[currentQuestionIndex].question}
          answers={questions[currentQuestionIndex].answers}
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
