import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { UserDetailedResponse, UserRetrievalResultDetailed } from "./types";

export async function getUserDetailed(userId: string, fetch: FetchCallbackType = originalFetch): Promise<UserRetrievalResultDetailed> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${userId}/detailed`);
        if (response.status == 404) {
            return { tag: "not found" };
        }
        if (!response.ok) {
            return { tag: "error", "error": response.statusText };
        }

        const user = await response.json() as UserDetailedResponse;
        user.videos.forEach(video => {
            video.createdAt = new Date(video.createdAt);
        });
        return { tag: "success", user: user };
    } catch (error) {
        return { tag: "error", "error": (error as Error).message };
    }
}
