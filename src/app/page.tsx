"use client";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Upload, Users, BarChart, Zap, MoveRight } from 'lucide-react';
import Header from "./components/Header";

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/feed');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-gray-900 opacity-50"></div>
          <div className="container mx-auto px-6 relative">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Create. Share. <span className="text-emerald-400">Inspire.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join the next generation of creators. Upload your reels and connect with a global community.
            </p>
            <Link
              href="/login"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-flex items-center"
            >
              Get Started for Free <MoveRight className="ml-2" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-800/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">Why You&apos;ll Love iVideo</h2>
              <p className="text-gray-400 mt-2">Everything you need to go viral.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Upload />}
                title="Seamless Uploads"
                description="Effortlessly upload your videos in any format and share them in seconds."
              />
              <FeatureCard
                icon={<Users />}
                title="Community Focused"
                description="Engage with a vibrant community of creators and fans."
              />
              <FeatureCard
                icon={<BarChart />}
                title="Analytics"
                description="Track your video performance with our easy-to-use analytics."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <Zap className="mx-auto text-emerald-400 h-12 w-12 mb-4" />
            <h2 className="text-4xl font-bold mb-4">Ready to Go Viral?</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Your next masterpiece is just an upload away. Join iVideo today and show the world what you&apos;ve got.
            </p>
            <Link
              href="/login"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-flex items-center"
            >
              Start Creating
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800/50 border-t border-gray-700 py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          &copy; {new Date().getFullYear()} iVideo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors">
    <div className="text-emerald-400 mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);
