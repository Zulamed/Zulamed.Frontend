import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export type Response =
    | { status: "ok" }
    | { status: "not-found" }
    | { status: "error", error: string };
export async function toggleHistory(fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/viewHistory`, {
            method: "PUT",
        });
        console.log(result);
        if (result.status === 404) {
            return { status: "not-found" };
        }
        if (!result.ok) {
            return { status: "error", error: await result.text() };
        }
        return { status: "ok" };

    } catch (error) {
        return { status: "error", error: (error as Error).message };
    }
}
