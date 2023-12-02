import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Video } from "$lib/models/video";
import type { VideoAllResponse, User } from "./getAll/types";


export async function getVideosByTitle(fetch: FetchCallbackType = originalFetch, title: string, page = 1, pageNo = 10): Promise<VideoAllResponse> {
    try {

        const response = await fetch(`${PUBLIC_BACKEND_URL}/video?title=${title}&page=${page}&pageSize=${pageNo}`);

        if (!response.ok) {
            return { tag: "error", error: response.statusText }
        }

        const data = await response.json() as { videos: { video: Video, user: User }[] }
        return { tag: "success", data }
    } catch (error) {
        return { tag: "error", error: (error as Error).message }
    }
}
