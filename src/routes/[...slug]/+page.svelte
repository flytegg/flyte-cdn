<script lang="ts">
    import FileGridView from '$lib/FileGridView.svelte';
    import type { PageData } from './$types'
	export let data: PageData
</script>

<svelte:head>
    <title>CDN - Flyte</title>
</svelte:head>

<div class="flex flex-col space-y-14 items-start">
    <div class="flex flex-col space-y-2">
        <h1 class="font-bold text-4xl text-white">Flyte CDN</h1>
        <p class="text-xl text-white/50">Browse all of the available Flyte assets.</p>
    </div>
    <a href="./" class="text-white/50 text-lg">{"<-"} Back</a>
    <FileGridView data={data} />
</div>