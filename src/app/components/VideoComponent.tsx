import { IKVideo } from "imagekitio-next";
import { iVideo } from "../../../models/Video";

export default function VideoComponent({ video }: { video: iVideo }) {
    return (
        <div className="group relative bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
            {/* Video Container */}
            <div className="relative overflow-hidden rounded-t-2xl">
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
            <div className="p-3 space-y-2">
                {/* Title */}
                <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">
                    {video.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {video.description}
                </p>
            </div>
        </div>
    );
}
