import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, params }) => {
    const { userId } = params;
    // load user data : TODO
    // ...
}) satisfies PageServerLoad
