"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { apiClient } from "../../../lib/api-client";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";

interface VideoFormData {
    title: string;
    description: string;
    videoURL: string;
    thumbnailURL: string;
}

export default function VideoUploadForm() {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VideoFormData>({
        defaultValues: {
            title: "",
            description: "",
            videoURL: "",
            thumbnailURL: "",
        },
    });

    const handleUploadSuccess = (response: IKUploadResponse) => {
        setValue("videoURL", response.filePath);
        setValue("thumbnailURL", response.thumbnailUrl || response.filePath);
        toast.success("Video uploaded successfully!");
    };

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const onSubmit = async (data: VideoFormData) => {
        if (!data.videoURL) {
            toast.error("Please upload a video first");
            return;
        }

        setLoading(true);
        try {
            await apiClient.createVideo(data);
            toast.success("Video published successfully!");
            setValue("title", "");
            setValue("description", "");
            setValue("videoURL", "");
            setValue("thumbnailURL", "");
            setUploadProgress(0);

            router.push("/");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to publish video");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-black text-white p-8 rounded-xl shadow-md"
        >
            <div className="flex flex-col space-y-3">
                <label className="text-md font-semibold">Title</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    className={`bg-[#1e1e1e] text-white rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 ${errors.title ? "ring-2 ring-red-500" : ""}`}
                    {...register("title", { required: "Title is required" })}
                />
            </div>

            <div className="flex flex-col space-y-3">
                <label className="text-md font-semibold">Description</label>
                <textarea
                    placeholder="Enter description"
                    className={`bg-[#1e1e1e] text-white rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 resize-none ${errors.description ? "ring-2 ring-red-500" : ""}`}
                    rows={5}
                    {...register("description", { required: "Description is required" })}
                />
            </div>

            <div className="flex flex-col space-y-3 width">
                <label className="text-md font-semibold">Upload Video</label>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "rgb(30,41,57)" }}>
                    <FileUpload
                        fileType="video"
                        onSuccess={handleUploadSuccess}
                        onProgress={handleUploadProgress}
                    />
                </div>

                {uploadProgress > 0 && (
                    <div className="w-full bg-gray-700 rounded-full h-3.5 mt-2">
                        <div
                            className="bg-purple-500 h-3.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-md py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={loading || !uploadProgress}
            >
                {loading ? (
                    <div className="flex justify-center items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Publishing Video...</span>
                    </div>
                ) : (
                    "Publish Video"
                )}
            </button>
        </form>
    );
}
