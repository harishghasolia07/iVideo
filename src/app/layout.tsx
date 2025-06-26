import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";  // Import Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iVideo - Short Video Platform",
  description: "Discover amazing short videos, share your creativity, and connect with creators worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Toaster position="bottom-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
