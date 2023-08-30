import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Comment } from "../types";

export type Response =
    | { status: "ok", data: Comment }
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
            body: JSON.stringify({ content: comment }),
        });
        if (response.status == 404) {
            return { status: "not-found" };
        }

        if (!response.ok) {
            return { status: "error", message: response.statusText };
        }
        const commentResponse = await response.json() as Comment;
        commentResponse.sentAt = new Date(commentResponse.sentAt);
        return { status: "ok", data: commentResponse };
    } catch (error) {
        return { status: "error", message: (error as Error).message };
    }
}
