import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

type Response =
    | { status: "ok" }
    | { status: "not-found" }
    | { status: "error", message: string };


export async function hasSubscribedTo(subscriptionId: string, fetch: FetchCallbackType = originalFetch): Promise<Response> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${subscriptionId}/subscribe`);
        if (response.status === 404) {
            return { status: "not-found" };
        }
        if (!response.ok) {
            return { status: "error", message: response.statusText };
        }
        return { status: "ok" };

    } catch (error) {
        return { status: "error", message: (error as Error).message };
    }
}

