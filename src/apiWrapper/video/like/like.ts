import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public"


export type Response =
    | { status: "ok" }
    | { status: "error", error: string }

const originalFetch = fetch;

export async function likeVideo(id: string, userId: string, fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // needs to be changed, bcs the id should be passed down in the auth header
            body: JSON.stringify({ userId })
        });
        if (!result.ok) {
            return { status: "error", error: await result.json() }
        }
        return { status: "ok" }
    } catch (error) {
        return { status: "error", error: (error as Error).message }
    }
}
