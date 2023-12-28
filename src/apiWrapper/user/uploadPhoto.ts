import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { FetchCallbackType } from "$backend/fetchCallbackType";

export type FileInfo = {
    photoUrl: string;
}

export type Response =
    | { status: "ok", response: FileInfo }
    | { status: "not-found" }
    | { status: "error", message: string };


export async function uploadPhoto(userId: string, file: File, fetch: FetchCallbackType): Promise<Response> {
    const formData = new FormData();
    formData.append("Photo", file);
    const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${userId}/photo`, {
        method: "POST",
        body: formData
    });
    if (response.ok) {
        return { status: "ok", response: await response.json() };
    }
    if (response.status === 404) {
        return { status: "not-found" };
    }
    const message = await response.text();
    return { status: "error", message };
}

