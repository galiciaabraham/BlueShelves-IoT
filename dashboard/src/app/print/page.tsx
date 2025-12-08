'use client';

import { useState } from "react";
import { generateTags } from "@/utils/generateTags";

export default function PrintPage() {
    const [ count, setCount ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");

    async function handleGenerate() {
        if (!count || isNaN(Number(count))) {
            setMessage("Please enter a valid number of tags to generate.");
            return;
        } else {
            setMessage("");
            generateTags(count).then(() => {
                setMessage(`Successfully generated ${count} tags.`);
                setLoading(false);
            }).catch((error) => {
                console.error("Error generating tags:", error);
                setMessage("An error occurred while generating tags.");
                setLoading(false);
            });
        }
    }

    setLoading(true);
    setMessage("");

    return (
        <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h1>Simulated Tag Printing</h1>

      <p>
        Welcome! Enter a number to generate simulated tags.  
        This simulates a real printing operation that assigns a <b>unique ID</b>  
        to each tag and stores it in the system database.
      </p>

      <input
        type="number"
        placeholder="Number of tags to generate"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        style={{
          padding: "10px",
          width: "100%",
          marginTop: 12,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "10px",
          background: "#0070f3",
          color: "white",
          borderRadius: 6,
          border: "none",
        }}
      >
        {loading ? "Generating..." : "Generate Tags"}
      </button>

      {message && (
        <p style={{ marginTop: 20, fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}