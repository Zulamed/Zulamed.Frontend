import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Video } from "$lib/models/video";
import type { User, VideoAllResponse } from "./types";

export async function getAllVideos(): Promise<VideoAllResponse> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video`);
        if (!response.ok) {
            return { tag: "error", error: response.statusText };
        }
        const data = await response.json() as { videos: { video: Video, user: User }[] };
        return { tag: "success", data };
    } catch (e) {
        return { tag: "error", error: (e as Error).message };
    }
}
