import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import api from "./api/client.js";

export default function App() {
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    api
      .get("/health")
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ color: "var(--crimson)" }}>
          <Heart size={28} /> LifeLink
        </h1>
        {status === "loading" && <p>Checking server...</p>}
        {status === "ok" && <p>Server and database are connected.</p>}
        {status === "error" && <p>Cannot reach the server. Is it running?</p>}
      </div>
    </div>
  );
}