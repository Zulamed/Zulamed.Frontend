import type { RequestHandler } from "./$types";
import countriesJson from "../../../countries.json";
import type { Country } from "$lib/types";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const countriesAndCities = countriesJson as {name: string}[];
    return json(countriesAndCities);
};


