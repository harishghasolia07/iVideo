"use client";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const showHeader = pathname !== '/';

    return (
        <>
            {showHeader && <Header />}
            <Toaster position="bottom-right" />
            {children}
        </>
    );
}
