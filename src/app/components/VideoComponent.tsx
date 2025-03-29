import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { iVideo } from "../../../models/Video";

export default function VideoComponent({ video }: { video: iVideo }) {
    return (
        <div className="shadow-md rounded-xl overflow-hidden p-2" style={{ backgroundColor: "rgb(26,33,36)" }}>
            <figure className="relative">
                {/* Clickable area should cover only the video */}
                <Link href={`/videos/${video._id}`} className="block group">
                    <div className="flex items-center justify-center p-2" style={{ aspectRatio: "9/16" }}>
                        <div className="w-full h-full relative rounded-3xl border-black border-[20px] border-t-[40px]">
                            <div className="w-full h-full overflow-hidden rounded-t-xl bg-black">
                                <IKVideo
                                    path={video.videoURL.toString()}
                                    transformation={[{ height: "1920", width: "1080" }]}
                                    controls={video.controls}
                                    className="w-full h-full object-cover bg-black rounded-t-xl"
                                    style={{ pointerEvents: "none" }} // Prevents double-click issue on video
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            </figure>

            {/* Text section */}
            <div className="p-4 space-y-2">
                {/* Make sure even the title has a hover */}
                <Link href={`/videos/${video._id}`} className="text-white text-lg font-bold hover:underline line-clamp-2">
                    {video.title}
                </Link>
                <p className="text-white text-sm line-clamp-3">{video.description}</p>
            </div>
        </div>
    );
}
