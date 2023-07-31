import type { PageServerLoad } from './$types';
import { getVideoById } from '$backend/video/getById/endpoint';
import { error as err } from '@sveltejs/kit';
import { match } from 'ts-pattern';

export const load = (async ({ params }) => {
    const result = await getVideoById(params.videoId);
    const video = match(result)
        .with({ tag: "success" }, ({ video }) => video)
        .with({ tag: "failure" }, ({ error }) => { throw err(500, error) })
        .with({ tag: "not-found" }, () => { throw err(404, "Video not found") })
        .exhaustive();
    return { video };
}) satisfies PageServerLoad;
