"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import { Upload } from "lucide-react";

export default function VideoUploadPage() {
    return (
        <div className="fixed inset-0 bg-gray-900 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-6">
                <div className="w-full max-w-md">
                    {/* Simple Header */}
                    <div className="text-center mb-4">
                        <div className="flex items-center justify-center mb-3">
                            <div className="bg-emerald-600 p-2.5 rounded-xl">
                                <Upload className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h1 className="text-xl font-bold text-white mb-2">
                            Upload New Video
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Share your content
                        </p>
                    </div>

                    {/* Upload Form */}
                    <VideoUploadForm />
                </div>
            </div>
        </div>
    );
}