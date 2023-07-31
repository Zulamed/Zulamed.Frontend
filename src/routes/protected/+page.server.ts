import type { PageServerLoad } from "./$types";

export const load = (async ({locals}) => {
    return {
        userId: locals.user
    }
}) satisfies PageServerLoad;
