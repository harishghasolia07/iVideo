import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { iVideo } from "../../../models/Video";

export default function VideoComponent({ video }: { video: iVideo }) {
    return (
        <div className="shadow-md rounded-xl overflow-hidden p-2" style={{ backgroundColor: "rgb(26,33,36)" }}>
            <figure className="relative">
                <div className="flex items-center justify-center p-2" style={{ aspectRatio: "9/16" }}>
                    <div className="w-full h-full relative rounded-3xl border-black border-[20px] border-t-[40px]">
                        <div className="w-full h-full overflow-hidden rounded-t-xl bg-black">
                            {/* ✅ Video is interactive but no navigation */}
                            <IKVideo
                                path={video.videoURL.toString()}
                                transformation={[{ height: "1920", width: "1080" }]}
                                controls
                                className="w-full h-full object-cover bg-black"
                            />
                        </div>
                    </div>
                </div>
            </figure>
            <div className="p-4">
                {/* ✅ Only title & description are clickable */}
                <Link href={`/videos/${video._id}`} className="text-white text-lg font-bold block">
                    {video.title}
                </Link>
                <p className="text-white text-sm mt-2 line-clamp-20">{video.description}</p>
            </div>
        </div>
    );
}
