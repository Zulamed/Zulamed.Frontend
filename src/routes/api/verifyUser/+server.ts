import type { RequestHandler } from "./$types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const POST: RequestHandler = async ({ fetch, request, cookies }) => {
    const { oobCode } = await request.json() as { oobCode: string };
    const response = await fetch(`${PUBLIC_BACKEND_URL}/user/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            oobCode
        })
    });
    if (response.status == 404) {
        return new Response("Not found", { status: 404 });
    }
    if (!response.ok) {
        return new Response("Error", { status: response.status });
    }
    return new Response("OK", { status: 200 });
}
