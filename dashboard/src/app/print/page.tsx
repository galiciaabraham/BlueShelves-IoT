'use client';

import { useState } from "react";
import { generateTags } from "@/utils/generateTags";
import { Footer, Header } from "@/components";

export default function PrintPage() {
    const [ count, setCount ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");

    async function handleGenerate() {
        if (!count || isNaN(Number(count)) || Number(count) <= 0) {
            setMessage("Please enter a valid number of tags to generate.");
            return;
        } else {
            setLoading(true);
            setMessage("");

            try {
                const result = await generateTags(Number(count));
                if (!result.success) {
                    setMessage(`Generated ${result.created} tags with errors: ${result.errors.join('; ')}`);
                    return;
                } else {
                setMessage(`Successfully generated ${result.created} tags.`);
                }
            } catch (error) {
                console.error("Error generating tags:", error);
                setMessage("An error occurred while generating tags.");
            } finally {
                setLoading(false);
            }
        }
    }

 

    return (
    <>
        <Header />
        <div className="max-w-[600px] mx-auto my-5 px-2">
        <div className="my-4 mx-auto p-6 max-w-2xl bg-white dark:bg-gray-800 rounded-lg border border-gray-400 dark:border-transparent">
      <h1>Simulated Tag Printing</h1>

      <p>
        Welcome! Enter a number to generate simulated tags.  
        This simulates a real printing operation that assigns a <b>unique ID </b>   
         to each tag and stores it in the system database.
      </p>

      <input
        type="number"
        placeholder="Number of tags to generate"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="p-2 w-full mt-3 rounded border border-gray-300"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-3 w-full p-2 cursor-pointer bg-blue-600 text-white rounded border-0"
      >
        {loading ? "Generating..." : "Generate Tags"}
      </button>

      {message && (
        <p className="mt-5 font-bold">{message}</p>
      )}
      </div>
    </div>
    <Footer />
    </>
  );
}