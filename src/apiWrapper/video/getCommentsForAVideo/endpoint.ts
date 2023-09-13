import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType"
import { PUBLIC_BACKEND_URL } from "$env/static/public"
import type { Comment } from "../types";


type Response =
    | { status: "ok", data: { comments: Comment[] } }
    | { status: "not-found" }
    | { status: "error", error: string }

export async function getComments(videoId: string, fetch: FetchCallbackType = originalFetch, pageNo = 1, pageSize = 10, ): Promise<Response> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${videoId}/comment?page=${pageNo}&pageSize=${pageSize}`);
        if (response.status === 404) {
            return { status: "not-found" }
        }
        if (!response.ok) {
            return { status: "error", error: response.statusText }
        }
        const comments = await response.json() as { comments: Comment[], total: number };
        comments.comments.forEach(comment => {
            comment.sentAt = new Date(comment.sentAt)
        });
        return { status: "ok", data: comments }
    } catch (error) {
        return { status: "error", error: (error as Error).message }
    }

}
