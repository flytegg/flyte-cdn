<script lang="ts">
    import '../app.css';
</script>

<svelte:head>
    <title>Flyte CDN</title>
</svelte:head>

<div class="bg-[#0d0b0d] min-h-screen min-w-screen md:flex md:justify-center">
    <div class="flex flex-col md:w-[80rem] px-6 md:px-10 py-14 relative">
        <div class="flex flex-col space-y-14 items-start">
            <div class="flex flex-col space-y-2">
                <h1 class="font-bold text-4xl text-white">Flyte CDN</h1>
                <p class="text-xl text-white/50">Browse all of the available Flyte assets.</p>
            </div>
            <slot />
        </div>
    </div>
</div>