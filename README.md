# 🎉 TRIVIA GAME 🎮
A FULL-STACK INTERACTIVE TRIVIA QUIZ GAME BUILT WITH REACT, AWS LAMBDA, API GATEWAY, COGNITO, DYNAMODB, AND OPENAI. THIS APPLICATION ALLOWS USERS TO TEST THEIR KNOWLEDGE WITH DYNAMICALLY GENERATED QUESTIONS, TRACK SCORES, AND VIEW A REAL-TIME LEADERBOARD.

## 🚀 FEATURES

### 🔹 DYNAMIC TRIVIA QUESTIONS
- Questions are generated in real-time using the OpenAI API (GPT-3.5).
- Includes 4 answer options with one correct answer.

### 🔹 TIMED QUIZ EXPERIENCE
- 15-second timer for each question.
- Automatic progression when the timer expires.

### 🔹 SECURE USER AUTHENTICATION
- Users authenticate securely using AWS Cognito.
- Scores are recorded with the user’s Cognito username.

### 🔹 REAL-TIME LEADERBOARD
- Displays scores in descending order.
- Only the user's highest score is recorded.

### 🔹 ROBUST AWS INTEGRATION
- AWS Lambda handles serverless API requests.
- DynamoDB stores quiz results and leaderboard data.
- API Gateway routes requests securely.

---

## 🛠️ TECH STACK

### FRONTEND
- React with TypeScript  
- React-Router for navigation  
- React-OIDC-Context for authentication  

### BACKEND
- AWS Lambda (Node.js)  
- API Gateway  
- Amazon DynamoDB  
- OpenAI API  

### AUTHENTICATION
- AWS Cognito  

---

## ⚙️ ARCHITECTURE DIAGRAM

## 🚧 SETUP INSTRUCTIONS
### 1. BACKEND SETUP
Deploy AWS Lambda functions:
GetTriviaQuestions → Fetches questions via OpenAI
LeaderboardHandler → Manages leaderboard data
Configure API Gateway with routes:
GET /GetTriviaQuestions
GET /Leaderboard
POST /Leaderboard
Enable CORS for front end.
### 2. FRONTEND SETUP
Clone the repository:
bash
Copy code
git clone https://github.com/ProperPoe/trivia-game.git
cd trivia-game
Install dependencies:
bash
Copy code
npm install
Add environment variables:
REACT_APP_OPENAI_API_KEY
API Gateway endpoint URLs
Run the app:
bash
Copy code
npm run dev

## ✅ FUTURE ENHANCEMENTS
Integrate AWS SageMaker for AI-powered personalized questions.
Add animations and enhanced UI.
Allow users to create their own trivia challenges.
## 🎯 HOW TO PLAY
Sign In: Log in securely with AWS Cognito.
Start Quiz: Fetch dynamic questions and begin.
Answer Questions: 15 seconds per question.
Submit Score: Your score appears on the leaderboard.
View Leaderboard: Compete for the top spot.
## 📄 LICENSE
This project is licensed under the MIT License. See the LICENSE file for details.

## 👨‍💻 AUTHOR
ProperPoe
GitHub: ProperPoe

## 🌟 ACKNOWLEDGMENTS
OpenAI for trivia generation.
AWS for scalable backend infrastructure.
React for seamless frontend development.