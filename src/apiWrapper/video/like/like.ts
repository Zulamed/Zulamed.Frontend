import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public"


export type Response =
    | { status: "ok" }
    | { status: "error", error: string }

export async function likeVideo(id: string, fetch: FetchCallbackType = global.fetch): Promise<Response> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/like`, {
            method: "POST"
        });
        if (!result.ok) {
            return { status: "error", error: result.statusText }
        }
        return { status: "ok" }
    } catch (error) {
        return { status: "error", error: (error as Error).message }
    }
}
