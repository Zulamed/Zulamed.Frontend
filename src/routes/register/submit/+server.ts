import { register, type FullDataUnion } from "$backend/user/register";
import { match } from "ts-pattern";
import type { RequestHandler } from "./$types";


export const POST: RequestHandler = async ({ fetch, request }) => {
    const union = await request.json() as unknown as FullDataUnion; // ?? typescript is weird
    const response = await register(fetch, union);
    return match(response)
        .with({ status: "success" }, () => new Response(null, { status: 200 }))
        .with({ status: "error" }, ({ error }) => new Response(error, { status: 400 }))
        .with({ status: "validationError" }, ({ error }) => new Response(error, { status: 400 }))
        .exhaustive();
}
