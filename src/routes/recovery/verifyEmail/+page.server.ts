import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"


export const load = (async ({fetch, url}) => {
    const oobCode = url.searchParams.get('oobCode');
    const response = await fetch('/api/verifyUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oobCode })
    });
    const isSuccessful = response.ok;
    return { isSuccessful };
}) satisfies PageServerLoad;
