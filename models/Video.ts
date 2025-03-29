import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSION = {//For reels we give a constant width and height
    width: 1080,
    height: 1920
} as const


export interface iVideo {
    _id?: mongoose.Types.ObjectId;
    title: String;
    description: String;
    videoURL: String;
    thumbnailURL: String;
    controls?: boolean;
    transformation?: {
        height: number
        width: number
        quality?: number
    }
    createdAt?: Date
    updatedAt?: Date
}

const videoSchema = new Schema<iVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoURL: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
        height: { type: Number, default: VIDEO_DIMENSION.height },
        width: { type: Number, default: VIDEO_DIMENSION.width },
        quality: { type: Number, min: 1, max: 100 }
    },
}, { timestamps: true })


const Video = models?.Video || model<iVideo>("Video", videoSchema)

export default Video