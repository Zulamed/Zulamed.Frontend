import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Video } from "$lib/models/video";
import type { FetchCallbackType } from "$backend/fetchCallbackType";
import type { User, VideoAllResponse } from "./types";

export async function getAllVideos(fetchCallback: FetchCallbackType = fetch)
: Promise<VideoAllResponse> {
    const fetch = fetchCallback;
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video`);
        if (!response.ok) {
            return { tag: "error", error: response.statusText };
        }
        const data = await response.json() as { videos: { video: Video, user: User }[] };
        data.videos.forEach(video => {
            video.video.videoPublishedDate = new Date(video.video.videoPublishedDate);
        });
        return { tag: "success", data };
    } catch (e) {
        return { tag: "error", error: (e as Error).message };
    }
}
