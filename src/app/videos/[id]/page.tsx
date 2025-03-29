"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { iVideo } from "../../../../models/Video";
import { IKVideo } from "imagekitio-next";

export default function VideoDetailPage() {
    const params = useParams();
    const id = params?.id as string | undefined;
    const [video, setVideo] = useState<iVideo | null>(null);

    useEffect(() => {
        if (!id) return; // don't fetch if id is undefined during SSR

        const fetchVideo = async () => {
            try {
                const res = await fetch(`/api/videos?id=${id}`);
                if (!res.ok) throw new Error("Failed to fetch video");
                const data = await res.json();
                setVideo(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchVideo();
    }, [id]);

    if (!video) return <p className="text-center text-white">Loading...</p>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4 text-white">{video.title}</h1>
            <div className="w-full max-w-xl mx-auto rounded-lg overflow-hidden" style={{ backgroundColor: "rgb(26,33,36)" }}>
                <IKVideo
                    path={video.videoURL.toString()}
                    transformation={[{ height: "1920", width: "1080" }]}
                    controls={video.controls}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="text-white mt-4">{video.description}</p>
        </div>
    );
}
