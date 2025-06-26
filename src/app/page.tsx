"use client";
import { useEffect, useState } from "react";
import { iVideo } from "../../models/Video";
import { apiClient } from "../../lib/api-client";
import VideoFeed from "./components/VideoFeed";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [videos, setVideos] = useState<iVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<iVideo[]>([]);

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
    fetchVideos();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold">Trending Videos</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <VideoFeed videos={filteredVideos} />
    </main>
  );
}