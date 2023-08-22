import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType"
import { PUBLIC_BACKEND_URL } from "$env/static/public"

type CommentAuthor = {
    id: string,
    username: string,
    profilePictureUrl?: string
}

export type Comment = {
    id: string,
    content: string,
    sentBy: CommentAuthor,
    sentAt: Date,
    relatedVideo: string
}

type Response =
    | { status: "ok", data: { comments: Comment[] } }
    | { status: "not-found" }
    | { status: "error", error: string }

export async function getComments(videoId: string, fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${videoId}/comment`);
        if (response.status === 404) {
            return { status: "not-found" }
        }
        if (!response.ok) {
            return { status: "error", error: response.statusText }
        }
        const data = { comments: await response.json() as Comment[] }
        return { status: "ok", data }
    } catch (error) {
        return { status: "error", error: (error as Error).message }
    }

}
