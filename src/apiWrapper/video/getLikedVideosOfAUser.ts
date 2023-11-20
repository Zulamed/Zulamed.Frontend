import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Video } from "$lib/models/video";
import type { User } from "./getAll/types";

type Data = { videos: { video: Video, user: User }[] }


type Response =
    | { status: 'ok', data: Data }
    | {status: 'error', message: string}

export async function getLikedVideos(liked: boolean, fetch: FetchCallbackType = originalFetch) : Promise<Response> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/video?liked=${liked}`);
        if (!result.ok){
            return {status: 'error', message: await result.text()}
        }
        const body = await result.json() as Data;
        body.videos.forEach(video => {
            video.video.videoPublishedDate = new Date(video.video.videoPublishedDate);
        });
        return {status: 'ok', data: body};
    } catch (error) {
        return {status: 'error', message: (error as Error).message};
    }
}

