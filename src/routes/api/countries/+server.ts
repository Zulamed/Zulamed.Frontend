import type { RequestHandler } from "./$types";
import countriesJson from "../../../short-countries-cities.json";
import type { Country } from "$lib/types";

export const GET: RequestHandler = async () => {
    const countriesAndCities = countriesJson as Country[];
    return new Response(JSON.stringify(countriesAndCities));
};


