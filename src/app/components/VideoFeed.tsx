import { iVideo } from "../../../models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
    videos: iVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.length > 0 ? (
                videos.map((video) => <VideoComponent key={video._id?.toString()} video={video} />)
            ) : (
                <p className="col-span-full text-gray-500 text-lg">No videos found</p>
            )}
        </div>
    );
}