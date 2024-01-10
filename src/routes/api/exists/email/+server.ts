import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { RequestHandler } from "./$types";


export const POST: RequestHandler = async ({ request }) => {
    const { email } = await request.json() as { email: string };
    const response = await fetch(`${PUBLIC_BACKEND_URL}/user/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });
    return response.ok ? new Response(null, { status: 200 }) : new Response(null, { status: 404 });
}
