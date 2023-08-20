import type { FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

const globalFetch = fetch;

export type ViewResponse =
    | { status: "ok" }
    | { status: "error", message: string };

export async function viewVideo(id: string, fetch: FetchCallbackType = globalFetch) {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/view`, {
            method: "POST"
        });
        if (!response.ok) {
            return { status: "error", message: await response.json() };
        }
        return { status: "ok" };
    } catch (error) {
        if (error instanceof Error) {
            return { status: "error", message: error.message };
        }
    }
}
