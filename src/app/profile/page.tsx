"use client";

import { useState } from "react";

export default function ProfilePage() {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/update-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, newPassword }),
            });

            const data = await res.json();
            setMessage(data.message || data.error);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage("Error updating profile.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block font-medium">New Username</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-medium">New Password</label>
                    <input
                        type="password"
                        className="w-full border px-4 py-2 rounded-md"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                    Update Profile
                </button>
                {message && <p className="text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
}
