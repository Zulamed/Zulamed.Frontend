import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { UserRetrievalResult, UserResponse } from "./types";


export async function getUser(userId: string): Promise<UserRetrievalResult> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${userId}`);
        if (response.status == 404) {
            return { tag: "not found" };
        }
        if (!response.ok) {
            return { tag: "error", "error": "Unknown error" };
        }

        const user = await response.json() as UserResponse;
        return { tag: "success", user: user};
    } catch (error) {
        return { tag: "error", "error": (error as Error).message};
    }
}
