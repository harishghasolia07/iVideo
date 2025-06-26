import { IKVideo } from "imagekitio-next";
import { iVideo } from "../../../models/Video";

export default function VideoComponent({ video }: { video: iVideo }) {
    return (
        <div className="group relative bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            {/* Video Container */}
            <div className="relative overflow-hidden rounded-t-lg">
                <div className="aspect-[9/16] relative bg-gray-900">
                    <IKVideo
                        path={video.videoURL.toString()}
                        transformation={[{ height: "1920", width: "1080" }]}
                        controls
                        className="w-full h-full object-cover"
                        style={{ borderRadius: "0" }}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-2 space-y-1">
                {/* Title */}
                <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                    {video.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {video.description}
                </p>
            </div>
        </div>
    );
}
