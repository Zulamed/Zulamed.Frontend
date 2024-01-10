import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { RequestHandler } from "./$types";


export const POST: RequestHandler = async ({ request }) => {
    const { login } = await request.json() as { login: string };
    const response = await fetch(`${PUBLIC_BACKEND_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login })
    });
    return response.ok ? new Response(null, { status: 200 }) : new Response(null, { status: 404 });
}

