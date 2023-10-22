import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


const recoveryType = z.enum(["resetPassword", "verifyEmail"]);

type RecoveryType = z.infer<typeof recoveryType>;

type HasKeys =
    | { success: false }
    | { success: true, data: { mode: RecoveryType | undefined, oobCode: string, apiKey: string } }


function hasFirebaseKeys(url: URL, keys: string[]): HasKeys {
    if (!keys.every(key => url.searchParams.has(key))) {
        return { success: false };
    }
    const mode = recoveryType.safeParse(url.searchParams.get("mode"));
    return {
        success: true,
        data: {
            mode: mode.success ? mode.data : undefined,
            oobCode: url.searchParams.get("oobCode") as string,
            apiKey: url.searchParams.get("apiKey") as string,
        }
    }
}

export const load = (async ({ url }) => {
    const result = hasFirebaseKeys(url, ["mode", "oobCode", "apiKey"]);

    if (!result.success) {
        throw redirect(308, "/");
    }
    const { mode, oobCode, apiKey } = result.data;
    if (!mode) {
        throw redirect(308, "/");
    }
    if (mode == "resetPassword") {
        throw redirect(308, `/recovery/createNewPass?oobCode=${oobCode}&apiKey=${apiKey}`)
    }
    if (mode == "verifyEmail") {
        throw redirect(308, `/recovery/verifyEmail?oobCode=${oobCode}&apiKey=${apiKey}`)
    }

}) satisfies PageServerLoad;
