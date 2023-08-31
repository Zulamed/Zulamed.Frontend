import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { originalFetch, type FetchCallbackType } from "$backend/fetchCallbackType";
import type { User } from "./get/types";

export type Subscription = { user: User, numberOfSubscribers: number };

export type SubscriptionsResponse =
    | { tag: "success", subscriptions: Subscription[] }
    | { tag: "not found" }
    | { tag: "error", error: string };

export async function getSubscriptions(userId: string, fetch: FetchCallbackType = originalFetch): Promise<SubscriptionsResponse> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${userId}/subscriptions`);
        if (response.status == 404) {
            return { tag: "not found" };
        }
        if (!response.ok) {
            return { tag: "error", "error": response.statusText };
        }
        const subscriptions = await response.json() as {subscriptions: Subscription[]} ;
        return { tag: "success", subscriptions: subscriptions.subscriptions };
    } catch (error) {
        return { tag: "error", "error": (error as Error).message };
    }
}
