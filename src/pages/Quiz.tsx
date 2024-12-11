import React from 'react';
import QuestionCard from '../components/QuestionCard';

export default function Quiz() {
  const handleAnswerClick = (answer: string) => {
    console.log(`You clicked: ${answer}`);
  };

  return (
    <QuestionCard
      question="What is the capital of France?"
      answers={['Paris', 'London', 'Rome', 'Berlin']}
      onAnswerClick={handleAnswerClick}
    />
  );
}
