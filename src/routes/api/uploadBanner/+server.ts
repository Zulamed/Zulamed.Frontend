import type { RequestHandler } from "./$types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const POST: RequestHandler = async ({fetch,request, locals}) => {
    if (!locals.user){
        return new Response("Unauthorized", {status: 401});
    }
    const formData = await request.formData();
    const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${locals.user.id}`, {
        method: "POST",
        body: formData
    });
    return response;
}
