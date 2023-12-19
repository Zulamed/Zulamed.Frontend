import type {PageServerLoad } from  "./$types"
import json from "../../short-countries-cities.json"
import type { Country } from "$lib/types"




export const load = (async () => {
    const countriesAndCities: Country[] = json as Country[]
    return {countriesAndCities}
}) satisfies PageServerLoad
