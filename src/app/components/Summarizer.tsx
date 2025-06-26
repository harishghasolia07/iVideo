"use client";

import { useState } from "react";
import axios from "axios";

export default function Summarizer() {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const summarizeText = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setSummary("");

        try {
            const response = await axios.post("/api/summarize", { text });
            setSummary(response.data[0].summary_text);
        } catch {
            setSummary("Failed to summarize text.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">AI Video Summarizer</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter video description or transcript..."
                className="w-full p-3 rounded-md bg-gray-900 text-white"
                rows={4}
            />
            <button
                onClick={summarizeText}
                className="w-full mt-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold"
                disabled={loading}
            >
                {loading ? "Summarizing..." : "Summarize"}
            </button>
            {summary && (
                <div className="mt-4 p-3 bg-gray-700 rounded-md">
                    <h3 className="text-lg font-semibold">Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}
