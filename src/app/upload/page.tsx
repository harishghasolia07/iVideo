"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import { Upload } from "lucide-react";

export default function VideoUploadPage() {
    return (
        <div className="fixed inset-0 bg-gray-900 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center px-8 py-12">
                <div className="w-full max-w-2xl">
                    {/* Simple Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-emerald-600 p-4 rounded-2xl">
                                <Upload className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Upload New Video
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Share your content with the world
                        </p>
                    </div>

                    {/* Upload Form */}
                    <VideoUploadForm />
                </div>
            </div>
        </div>
    );
}