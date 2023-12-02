import { getVideosByTitle } from "$backend/video/getVideoByTitle";
import { match } from "ts-pattern";
import { error as err } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"


export const load = (async ({ url }) => {
    const query = url.searchParams.get("q");
    if (query === null) {
        throw new Error("Missing query parameter");
    }

    const response = await getVideosByTitle(fetch, query);

    const videos = match(response)
        .with({ tag: "success" }, ({ data }) => data)
        .with({ tag: "error" }, ({ error }) => { throw err(500, error) })
        .exhaustive();

    console.log(videos);


    return {
        videoResponse : videos
    }
}) satisfies PageServerLoad
