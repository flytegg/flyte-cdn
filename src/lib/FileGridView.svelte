<script lang="ts">
    import type { PageData } from "./$types"
    import FileIcon from "./FileIcon.svelte"
    export let data: PageData
</script>
<div class="container grid">
    <div class="flex flex-wrap justify-center md:justify-normal gap-4">
        {#each data.files as file}
            <a href={`${file.isDirectory ? "" : "https://cdn.internal.flyte.gg"}${data.slug ? `${data.slug}` : ""}/${file.slug}`} class="bg-white/5 flex flex-col justify-center items-center space-y-5 aspect-square h-72 w-72 rounded-2xl p-4">
                {#if file.favicon}
                    <img src={file.favicon} alt="" class="w-40 h-40 bg-black/20 p-6 rounded-2xl aspect-square">
                {:else}
                    <FileIcon extension={file.extension} />
                {/if}
                <div class="flex flex-col items-center space-y-1">
                    <h1 class="text-white/90 font-semibold text-2xl">{file.name ?? file.slug}</h1>
                    <h2 class="text-white/50">{file.isDirectory ? `/${file.slug}` : file.size}</h2>
                </div>
            </a>
        {:else}
            <h2 class="text-white/40 w-full text-center">This directory is empty.</h2>
        {/each}
    </div>
</div>