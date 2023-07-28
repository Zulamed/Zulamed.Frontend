import type { Video } from "$lib/models/video";

export type VideoResponse =
    | {tag: 'success', video: Video}
    | {tag: 'failure', error: string}
    | {tag: 'not-found'}
