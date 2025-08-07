import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import { Metadata } from 'next';
import RootLayoutClient from './layout-client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iVideo - Short Video Platform",
  description: "Discover amazing short videos, share your creativity, and connect with creators worldwide.",
  icons: {
    icon: '/logo.png',
  },
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
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
