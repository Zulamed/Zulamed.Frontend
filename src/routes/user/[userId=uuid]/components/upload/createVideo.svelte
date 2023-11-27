<script lang="ts">
	import type * as UpChunk from "@mux/upchunk";
	import Stepper from "./stepper.svelte";
	import Upload from "./upload.svelte";

    let step = 1;

    let uploadObject: UpChunk.UpChunk;


    function fileUploaded(e: CustomEvent<{uploadObject: UpChunk.UpChunk}>) {
        step = 2;
        uploadObject = e.detail.uploadObject;
    }



</script>


{#if step == 1}
    <Upload on:fileUploaded={fileUploaded}></Upload>
{:else if step == 2}
    <Stepper></Stepper>
{/if}

