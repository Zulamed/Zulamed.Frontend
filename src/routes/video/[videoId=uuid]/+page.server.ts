import type { PageServerLoad , Actions} from './$types';
import { getVideoById } from '$backend/video/getById/endpoint';
import { error as err } from '@sveltejs/kit';
import { match } from 'ts-pattern';
import { likeVideo } from '$backend/video/like/like';

export const load = (async ({ params, fetch }) => {
    const result = await getVideoById(params.videoId, fetch);
    const videoInfo = match(result)
        .with({ tag: "success" }, ({ response }) => response)
        .with({ tag: "failure" }, ({ error }) => { throw err(500, error) })
        .with({ tag: "not-found" }, () => { throw err(404, "Video not found") })
        .exhaustive();
    return { videoInfo };
}) satisfies PageServerLoad;

export const actions = {
    like: async ({fetch,request,locals}) => {
        const data = await request.formData();
        const videoId = data.get("videoId") as string;
        const response = await likeVideo(videoId,locals.user.id, fetch);
        if (response.status == "error") {
            console.log(response.error);
        }
    }
} satisfies Actions;
