import { iVideo } from "../../../models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
    videos: iVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.length > 0 ? (
                videos.map((video) => <VideoComponent key={video._id?.toString()} video={video} />)
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-gray-800/50 rounded-full p-6 mb-4">
                        <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
                    <p className="text-gray-400 max-w-md">
                        There are no videos to display at the moment. Try adjusting your search or check back later.
                    </p>
                </div>
            )}
        </div>
    );
}