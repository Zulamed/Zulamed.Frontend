import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Video } from "$lib/models/video";
import type { User, VideoResponse } from "./types";

export async function getVideoById(id: string, fetch: FetchCallbackType = global.fetch): Promise<VideoResponse> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}`);
        if (response.status == 404){
            return { tag: "failure", error: "Video not found" };
        }
        if (!response.ok){
            return { tag: "failure", error: "Error while fetching video" };
        }
        const video = await response.json() as {video: Video, user: User};
        return { tag: "success", response: video};

    } catch (error) {
        return { tag: "failure", error: (error as Error).message };
    }
}
