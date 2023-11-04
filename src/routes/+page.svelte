<script lang="ts">
    import FileGridView from '$lib/FileGridView.svelte';
    import type { PageData } from './$types'
	export let data: PageData
</script>

<FileGridView data={data} />