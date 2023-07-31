import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Video } from "$lib/models/video";
import type { VideoResponse } from "./types";

export async function getVideoById(id: string): Promise<VideoResponse> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}`);
        if (response.status == 404){
            return { tag: "failure", error: "Video not found" };
        }
        if (!response.ok){
            return { tag: "failure", error: "Error while fetching video" };
        }
        const video = await response.json() as Video;
        return { tag: "success", video };

    } catch (error) {
        return { tag: "failure", error: (error as Error).message };
    }
}
