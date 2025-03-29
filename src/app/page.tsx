"use client";
import { useEffect, useState } from "react";
import { iVideo } from "../../models/Video";
import { apiClient } from "../../lib/api-client";
import VideoFeed from "./components/VideoFeed";

export default function Home() {
  const [videos, setVideos] = useState<iVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold  mb-6">Trending Videos</h1>
      <VideoFeed videos={videos} />
    </main>
  );
}
