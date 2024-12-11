import React from 'react';

interface QuestionCardProps {
  question: string;
  answers: string[];
  onAnswerClick: (answer: string) => void;
}

export default function QuestionCard({
  question,
  answers,
  onAnswerClick,
}: QuestionCardProps) {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        margin: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{question}</p>
      <div>
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswerClick(answer)}
            style={{
              display: 'block',
              width: '100%',
              margin: '10px 0',
              padding: '10px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ddd',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
