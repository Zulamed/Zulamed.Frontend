import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (({ url }) => {
    const oobCode = url.searchParams.get("oobCode");
    const apiKey = url.searchParams.get("apiKey");
    if (!oobCode || !apiKey) {
        throw error(500, "Missing required parameters")
    }
    return { oobCode, apiKey };
}) satisfies PageLoad
