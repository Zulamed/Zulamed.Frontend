import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Video } from "$lib/models/video";
import type { VideoAllResponse, User } from "./getAll/types";


export async function getVideosOfUser(fetch: FetchCallbackType): Promise<VideoAllResponse> {
    try {

        const response = await fetch(`${PUBLIC_BACKEND_URL}/video?own=true`);

        if (!response.ok) {
            return { tag: "error", error: response.statusText };
        }

        const json = await response.json() as { videos: { video: Video, user: User }[] };
        json.videos.forEach(video => {
            video.video.videoPublishedDate = new Date(video.video.videoPublishedDate);
        });

        return { tag: "success", data: json };
    } catch (error) {
        return { tag: "error", error: (error as Error).message };
    }
}
