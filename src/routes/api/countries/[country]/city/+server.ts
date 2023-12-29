import type { RequestHandler } from "./$types";
import countriesJson from "../../../../../short-countries-cities.json";
import type { City, Country } from "$lib/types";
import { json } from "@sveltejs/kit";

export type Body = {
    country: string;
}


function validateCountry(listOfCountries:Country[], country: string) {
    return listOfCountries.some(({name}) => name === country);
}

type CountriesAndCities = {
    name: string;
    cities: City[];
}

export const GET: RequestHandler = async ({params}) => {
    const countriesAndCities = countriesJson as CountriesAndCities[];
    if (!params.country) {
        return new Response(JSON.stringify({
            status: 400,
            body: "Country not provided"
        }),{status: 400});
    }
    if (!validateCountry(countriesAndCities, params.country)) {
        return new Response(JSON.stringify({
            status: 400,
            body: "Country not found"
        }),{status: 400});
    }
    const cities = countriesAndCities.find(({name}) => name === params.country)?.cities;
    return json(cities);
}

