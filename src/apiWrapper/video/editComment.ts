import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export type Response =
    | { status: "ok", editedComment: string }
    | { status: "not-found" }
    | { status: "error", message: string };


export async function editComment(videoId: string, commentId: string, editedText: string, fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const url = `${PUBLIC_BACKEND_URL}/video/${videoId}/comment/${commentId}`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                commentId: commentId,
                videoId: videoId,
                editedText: editedText
            })
        });
        if (response.status === 404) {
            return { status: "not-found" };
        }
        if (!response.ok) {
            return { status: "error", message: response.statusText };
        }
        const json = await response.json() as { commentId: string, editedText: string };
        return { status: "ok", editedComment: json.editedText };
    } catch (error) {
        return { status: "error", message: (error as Error).message };
    }
}
