"use client";
import { useEffect, useState } from "react";
import { iVideo } from "../../../models/Video";
import { apiClient } from "../../../lib/api-client";
import VideoFeed from "../components/VideoFeed";
import SearchBar from "../components/SearchBar";
import { TrendingUp, Clock, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FeedPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [videos, setVideos] = useState<iVideo[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<iVideo[]>([]);
    const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'popular'>('trending');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/login');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await apiClient.getVideos();
                setVideos(data);
                setFilteredVideos(data);
            } catch (error) {
                console.error("Error fetching videos", error);
            }
        };
        if (status === 'authenticated') {
            fetchVideos();
        }
    }, [status]);

    const handleSearch = (query: string) => {
        const filtered = videos.filter((video) =>
            video.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredVideos(filtered);
    };

    const handleTabChange = (tab: 'trending' | 'recent' | 'popular') => {
        setActiveTab(tab);
        // For now, just show all videos. You can implement sorting logic here
        setFilteredVideos(videos);
    };

    if (status === 'loading' || !session) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="home-page bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 pt-4 pb-2">
                <div className="flex justify-center mb-4">
                    <div className="max-w-md w-full">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>

                <div className="flex justify-center mb-4">
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 border border-gray-700">
                        <div className="flex space-x-1">
                            {[
                                { id: 'trending', label: 'Trending', icon: TrendingUp },
                                { id: 'recent', label: 'Recent', icon: Clock },
                                { id: 'popular', label: 'Popular', icon: Star }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id as 'trending' | 'recent' | 'popular')}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span className="font-medium text-sm">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <h2 className="text-lg font-bold text-white mb-3 flex items-center">
                        {activeTab === 'trending' && <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />}
                        {activeTab === 'recent' && <Clock className="w-5 h-5 mr-2 text-blue-400" />}
                        {activeTab === 'popular' && <Star className="w-5 h-5 mr-2 text-yellow-400" />}
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Videos
                    </h2>
                    <VideoFeed videos={filteredVideos} />
                </div>
            </div>
        </div>
    );
}
