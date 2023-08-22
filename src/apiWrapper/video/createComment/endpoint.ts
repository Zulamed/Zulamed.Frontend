import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

type Response =
    | { status: "ok" }
    | { status: "not-found" }
    | { status: "error", message: string };


export async function createComment(videoId: string, comment: string, fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${videoId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // subject to change
            body: JSON.stringify({content: comment}),
        });
        if (response.status == 404) {
            return { status: "not-found" };
        }

        if (!response.ok) {
            return { status: "error", message: response.statusText };
        }
        return { status: "ok" };
    } catch (error) {
        return { status: "error", message: (error as Error).message };
    }
}
