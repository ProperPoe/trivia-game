import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';

export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Welcome to the Trivia Game!" />
      <Button
        text="Start Quiz"
        onClick={() => {
          console.log('Start Quiz clicked!');
        }}
      />
    </div>
  );
}
