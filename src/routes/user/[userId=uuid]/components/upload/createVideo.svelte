<script lang="ts">
	import type * as UpChunk from "@mux/upchunk";
	import Stepper from "./stepper.svelte";
	import Upload from "./upload.svelte";

    let step = 1;

    let uploadObject: UpChunk.UpChunk;
    let videoId: string;



    function fileUploaded(e: CustomEvent<{uploadObject: UpChunk.UpChunk, videoId: string}>) {
        step = 2;
        uploadObject = e.detail.uploadObject;
        videoId = e.detail.videoId;
    }
</script>


{#if step == 1 && !uploadObject}
    <Upload on:fileUploaded={(e) => {
        fileUploaded(e);
    }}></Upload>
{:else if step == 2 && uploadObject}
    <Stepper uploadObject={uploadObject} {videoId}></Stepper>
{/if}

