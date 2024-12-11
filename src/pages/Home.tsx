import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Welcome to the Trivia Game!" />
      <Button
        text="Start Quiz"
        onClick={() => navigate('/quiz')}
      />
    </div>
  );
}
