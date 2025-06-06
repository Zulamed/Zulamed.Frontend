import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public"


export type Response =
    | { status: "ok" }
    | { status: "error", error: string }

const originalFetch = fetch;

export async function likeVideo(id: string, hasLiked = false, fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/like`, {
            method: !hasLiked ? "POST" : "DELETE",
        });
        if (!result.ok) {
            return { status: "error", error: await result.json() }
        }
        return { status: "ok" }
    } catch (error) {
        return { status: "error", error: (error as Error).message }
    }
}
