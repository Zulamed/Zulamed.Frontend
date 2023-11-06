import { redirect } from "@sveltejs/kit"
import type {PageServerLoad, Actions} from "./$types"


export const load: PageServerLoad = async ({fetch, locals}) => {
    if (!locals.user){
        throw redirect(307, "/");
    }
}




export const actions : Actions = {

}

