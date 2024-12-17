import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LeaderboardEntry {
  UserID: string;
  Score: number;
  Timestamp: string;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://r93ynamaqb.execute-api.us-east-2.amazonaws.com/Leaderboard"
        );
        setLeaderboard(response.data);
      } catch (err) {
        setError("Failed to load leaderboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Leaderboard</h1>
      <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>User</th>
            <th style={tableHeaderStyle}>Score</th>
            <th style={tableHeaderStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{entry.UserID}</td>
              <td style={tableCellStyle}>{entry.Score}</td>
              <td style={tableCellStyle}>{new Date(entry.Timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate("/")}
        style={backButtonStyle}
      >
        Back to Home
      </button>
    </div>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  fontWeight: "bold",
  backgroundColor: "#f4f4f4",
};

const tableCellStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
};

const backButtonStyle: React.CSSProperties = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
