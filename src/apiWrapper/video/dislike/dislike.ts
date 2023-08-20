import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export type Response =
    | { status: "ok" }
    | { status: "error", error: string }

const originalFetch = fetch;

export async function dislikeVideo(id: string, hasDisliked = false, fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/dislike`, {
            method: !hasDisliked ? "POST" : "DELETE",
        });
        if (!result.ok) {
            return { status: "error", error: await result.json() }
        }
        return { status: "ok" }
    } catch (error) {
        return { status: "error", error: (error as Error).message }
    }
}
