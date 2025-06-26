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
            className="space-y-4 bg-gray-800/80 border border-gray-700 text-white p-5 rounded-xl shadow-lg"
        >
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold">Title</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    className={`bg-gray-700/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-600 transition-all duration-300 ${errors.title ? "ring-2 ring-red-500" : ""}`}
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <span className="text-red-400 text-xs">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold">Description</label>
                <textarea
                    placeholder="Enter description"
                    className={`bg-gray-700/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-600 resize-none transition-all duration-300 ${errors.description ? "ring-2 ring-red-500" : ""}`}
                    rows={3}
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && <span className="text-red-400 text-xs">{errors.description.message}</span>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold">Upload Video</label>
                <div className="p-4 rounded-lg bg-gray-700/30 border border-gray-600">
                    <FileUpload
                        fileType="video"
                        onSuccess={handleUploadSuccess}
                        onProgress={handleUploadProgress}
                    />
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 transition rounded-lg py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={loading || uploadProgress === 0}
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
