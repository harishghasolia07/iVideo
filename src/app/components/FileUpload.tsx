"use client";
import React, { useState, useRef } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2, Upload, File } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void //Here void means is not nothing here its mean is that it is not more focused on output
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}

export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image"
}: FileUploadProps) {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onError = (err: { message: string }) => {
        console.log("Error", err);
        setError(err.message)
        setUploading(false)
    };

    const handleSuccess = (res: IKUploadResponse) => {
        console.log("Success", res);
        setUploading(false)
        setError(null)
        onSuccess(res)
    };

    const handleStartUpload = () => {
        setUploading(true);
        setError(null);
    };

    const handleProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) {
            const percentComplete = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(percentComplete));
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
        }
    };

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a valid video file");
                return false;
            }
            if (file.size > 100 * 1024 * 1024) {
                setError("Video size must be less than 100MB");
                return false;
            }
        } else {
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                setError("Please upload a valid image file (JPEG, PNG, or WebP)");
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return false;
            }
        }
        return true;
    };

    const handleChooseFile = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-3">
            {/* Custom File Input Design */}
            <div className="flex items-center space-x-3">
                <button
                    type="button"
                    onClick={handleChooseFile}
                    disabled={uploading}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    <Upload className="w-4 h-4" />
                    <span>CHOOSE FILE</span>
                </button>

                <div className="flex-1 text-white">
                    {selectedFileName ? (
                        <div className="flex items-center space-x-2 text-emerald-400">
                            <File className="w-4 h-4" />
                            <span className="truncate">{selectedFileName}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400">No file chosen</span>
                    )}
                </div>
            </div>

            {/* Hidden IKUpload component */}
            <div className="hidden">
                <IKUpload
                    ref={fileInputRef}
                    fileName={fileType === "video" ? "video" : "image"}
                    onError={onError}
                    onSuccess={handleSuccess}
                    onUploadStart={handleStartUpload}
                    onUploadProgress={handleProgress}
                    onChange={handleFileSelect}
                    accept={fileType === "video" ? "video/*" : "image/*"}
                    validateFile={validateFile}
                    useUniqueFileName={true}
                    folder={fileType === "video" ? "/videos" : "/images"}
                />
            </div>

            {uploading && (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                </div>
            )}

            {error && <div className="text-red-400 text-sm">{error}</div>}
        </div>
    );
}