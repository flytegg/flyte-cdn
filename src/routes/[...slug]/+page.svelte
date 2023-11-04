<script lang="ts">
    import FileGridView from '$lib/FileGridView.svelte';
    import type { PageData } from './$types'
	export let data: PageData
</script>

<a href="./" class="text-white/50 text-lg">{"<-"} Back</a>
<FileGridView data={data} />