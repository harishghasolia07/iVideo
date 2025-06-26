import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Video, { iVideo } from "../../../../models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/options";


export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query") || "";

        let videos;

        if (query) {
            videos = await Video.find({
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { description: { $regex: query, $options: "i" } },
                ],
            }).sort({ createdAt: -1 }).lean();
        } else {
            videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        }

        return NextResponse.json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const body: iVideo = await request.json();

        // Validate required fields
        if (
            !body.title ||
            !body.description ||
            !body.videoURL ||
            !body.thumbnailURL
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create new video with default values
        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            },
        };

        const newVideo = await Video.create(videoData);
        return NextResponse.json(newVideo);
    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json(
            { error: "Failed to create video" },
            { status: 500 }
        );
    }
}