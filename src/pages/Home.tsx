import React from "react";
import { useAuth } from "react-oidc-context";

export default function Home() {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome back, {auth.user?.profile.email}!</h1>
        <button
          onClick={() => auth.removeUser()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6200ea",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Trivia Game!</h1>
      <button
        onClick={() => auth.signinRedirect()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6200ea",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    </div>
  );
}
