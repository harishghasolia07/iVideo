"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Header() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleSignOut = async () => {
        try {
            await signOut();
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
        <div className="navbar bg-gray-900 text-white sticky top-0 z-40 shadow-md" style={{ backgroundColor: "rgb(21,22,29)" }}>
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                    <Home className="w-6 h-6" /> iVideo
                </Link>
                <div className="relative" ref={menuRef}>
                    {session ? (
                        <>
                            <button onClick={toggleMenu} className="text-white hover:text-gray-400 cursor-pointer">
                                <User className="w-6 h-6" />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg p-2">
                                    <p className="px-4 py-2 border-b">
                                        {session.user?.email?.split("@")[0]}
                                    </p>

                                    <Link href="/upload" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                                        Video Upload
                                    </Link>

                                    <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 cursor-pointer">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
