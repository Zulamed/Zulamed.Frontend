import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";


export type Response =
    | { status: "ok" }
    | { status: "not-found" }
    | { status: "error", message: string };


export async function updateUserDescription(userId: string, description: string, fetch: FetchCallbackType): Promise<Response> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${userId}`, {
            method: "PUT",
            body: JSON.stringify({ description }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 404) {
            return { status: "not-found" };
        }
        return { status: "ok" };
    } catch (error) {
        return { status: "error", message: (error as Error).message };
    }
}
