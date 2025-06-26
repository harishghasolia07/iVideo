"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Mail, Lock, LogIn, Play } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        });

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Login successful");
            router.replace("/");
        }
        setLoading(false);
    };

    return (
        <div className="auth-page bg-gray-900 flex items-center justify-center p-3">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-2">
                        <div className="bg-emerald-600 p-2.5 rounded-lg">
                            <Play className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-sm">Sign in to continue to iVideo</p>
                </div>

                {/* Login Form */}
                <div className="bg-gray-800/90 border border-gray-700 rounded-xl p-5 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-9 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-9 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-4"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>{loading ? "Signing in..." : "Sign In"}</span>
                        </button>
                    </form>

                    <div className="mt-3 text-center">
                        <p className="text-gray-400 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
