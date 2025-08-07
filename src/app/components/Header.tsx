"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, Upload, LogOut, Play, Film } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Header() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: '/' });
            toast.success("Signed out successfully");
        } catch {
            toast.error("Failed to sign out");
        }
    };

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link href={session ? "/feed" : "/"} className="flex items-center gap-3 group">
                    <div className="bg-emerald-600 hover:bg-emerald-500 p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">
                        iVideo
                    </span>
                </Link>

                <div className="relative" ref={menuRef}>
                    {session ? (
                        <>
                            <button
                                onClick={toggleMenu}
                                className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700/80 px-4 py-2 rounded-lg transition-all duration-300 border border-gray-700"
                            >
                                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-white hidden md:block">
                                    {session.user?.email?.split("@")[0]}
                                </span>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-xl p-2">
                                    <div className="px-4 py-3 border-b border-gray-700">
                                        <p className="text-sm text-gray-400">Signed in as</p>
                                        <p className="text-white font-medium truncate">
                                            {session.user?.email}
                                        </p>
                                    </div>

                                    <div className="py-2">
                                        <Link
                                            href="/feed"
                                            className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <Film className="w-4 h-4" />
                                            <span>My Feed</span>
                                        </Link>
                                        <Link
                                            href="/upload"
                                            className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <Upload className="w-4 h-4" />
                                            <span>Upload Video</span>
                                        </Link>
                                        <button
                                            onClick={() => { handleSignOut(); setMenuOpen(false); }}
                                            className="flex items-center space-x-3 w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
