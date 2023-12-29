import type { RequestHandler } from "./$types";
import countriesJson from "../../../short-countries-cities.json";
import type { Country } from "$lib/types";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const countriesAndCities = countriesJson as {name: string, cities: string[]}[];
    // this code is slow, need to optimize
    return json(countriesAndCities.map(({name}) => ({name})))
};


