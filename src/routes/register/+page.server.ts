import type {PageServerLoad } from  "./$types"
import type { Country } from "$lib/types"




export const load = (async ({fetch}) => {
   const countries = await fetch("/api/countries");
   return {countries : await countries.json() as Country[]}
}) satisfies PageServerLoad
