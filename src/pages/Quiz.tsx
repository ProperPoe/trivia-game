import React from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

interface CognitoUserProfile {
  "cognito:username"?: string; 
  email?: string; 
  [key: string]: any; 
}

export default function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isAuthenticated) {
    const profile = auth.user?.profile as CognitoUserProfile;
    const username = profile["cognito:username"] || "Anonymous";

    return (
      <div style={homeContainerStyle}>
        <h1>Welcome back, {username}!</h1>
        <p>Ready to test your knowledge?</p>
        <button
          onClick={() => navigate("/quiz")}
          style={buttonStyle}
        >
          Start Quiz
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          style={buttonStyle}
        >
          View Leaderboard
        </button>
        <button
          onClick={() => auth.removeUser()}
          style={signOutButtonStyle}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div style={homeContainerStyle}>
      <h1>Welcome to the Trivia Game!</h1>
      <p>Sign in to start playing and track your progress!</p>
      <button
        onClick={() => auth.signinRedirect()}
        style={buttonStyle}
      >
        Sign In
      </button>
    </div>
  );
}

const homeContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f9f9f9",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const signOutButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#d9534f",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
