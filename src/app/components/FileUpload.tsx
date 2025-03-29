"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
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
        return true; //TODO:
    };


    return (
        <div className="space-y-2">
            <IKUpload
                fileName={fileType === "video" ? "video" : "image"}
                onError={onError}
                onSuccess={handleSuccess}
                onUploadStart={handleStartUpload}
                onUploadProgress={handleProgress}
                accept={fileType === "video" ? "video/*" : "image/*"}
                className="file-input file-input-bordered w-full"
                validateFile={validateFile}
                useUniqueFileName={true}
                folder={fileType === "video" ? "/videos" : "/images"}
            />

            {uploading && (
                <div className="flex items-center gap-2 text-sm text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                </div>
            )}

            {error && <div className="text-error text-sm">{error}</div>}
        </div>
    );
}