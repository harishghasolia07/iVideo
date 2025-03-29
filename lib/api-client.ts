import { iVideo } from "../models/Video";

export type VideoFormData = Omit<iVideo, "_id">;

type fetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>; // <-- FIXED: instead of `any`
    headers?: Record<string, string>;
};

class ApiClient {
    private async myfetch<T>(
        endpoint: string,
        options: fetchOptions = {}
    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    async getVideos() {
        return this.myfetch<iVideo[]>("/videos");
    }

    async getVideo(id: string) {
        return this.myfetch<iVideo>(`/videos/${id}`);
    }

    async createVideo(videoData: VideoFormData) {
        return this.myfetch<iVideo>("/videos", {
            method: "POST",
            body: videoData,
        });
    }
}

export const apiClient = new ApiClient();
