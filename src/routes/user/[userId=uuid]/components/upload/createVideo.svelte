<script lang="ts">
	import type * as UpChunk from "@mux/upchunk";
	import Stepper from "./stepper.svelte";
	import Upload from "./upload.svelte";

    let step = 1;

    let uploadObject: UpChunk.UpChunk;


    function fileUploaded(e: CustomEvent<{uploadObject: UpChunk.UpChunk}>) {
        step = 2;
        console.log("test!");
        uploadObject = e.detail.uploadObject;
    }

    $: {
        console.log(uploadObject);
    }


</script>


{#if step == 1 && !uploadObject}
    <Upload on:fileUploaded={(e) => {
        fileUploaded(e);
    }}></Upload>
{:else if step == 2 && uploadObject}
    <Stepper uploadObject={uploadObject}></Stepper>
{/if}

