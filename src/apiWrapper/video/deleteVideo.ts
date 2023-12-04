import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export type Response =
    | { tag: "success" }
    | { tag: "error", error: string }



export async function deleteVideo(fetch: FetchCallbackType,videoId: string): Promise<Response> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${videoId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            return { tag: "error", error: response.statusText }
        };

        return { tag: "success" };

    } catch (error) {
        return { tag: "error", error: (error as Error).message };
    }
}
