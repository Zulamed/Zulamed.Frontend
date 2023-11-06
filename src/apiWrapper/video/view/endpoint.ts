import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

const globalFetch = fetch;

export type ViewResponse =
    | { status: "ok" }
    | { status: "error", message: string };

export async function viewVideo(id: string, fetch: FetchCallbackType = globalFetch) : Promise<ViewResponse> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/view`, {
            method: "POST"
        });
        if (!response.ok) {
            return { status: "error", message: await response.json() };
        }
        return { status: "ok" };
    } catch (error) {
        return { status: "error", message: (error as Error).message };
    }
}
