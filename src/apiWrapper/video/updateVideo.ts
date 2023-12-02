import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";


export type UpdateRequest = {
    id: string,
    videoTitle: string,
    videoDescription: string
}

export type UpdateResponse =
    | { status: "success" }
    | { status: "not-found", message: unknown}
    | { status: "error", message: string }


export async function updateVideo(fetch: FetchCallbackType = originalFetch, req: UpdateRequest) : Promise<UpdateResponse> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${req.id}`, {
            method: "PUT",
            body: JSON.stringify({
                videoTitle: req.videoTitle,
                videoDescription: req.videoDescription
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status === 404) {
            return { status: "not-found", message: "Video not found" }
        }


        if (!response.ok) {
            return { status: "error", message: await response.text() }
        }

        return { status: "success" }

    } catch (error) {
        console.error(error)
        return { status: "error", message: "Error updating video" }
    }
}
