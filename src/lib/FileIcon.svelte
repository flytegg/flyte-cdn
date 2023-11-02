<script lang="ts">
    export let extension: string = ""
    const classes = "w-40 h-40 bg-black/20 p-9 rounded-2xl aspect-square fill-white/10"
</script>

{#if ["jpeg", "jpg", "png", "gif", "bmp", "tiff", "tif", "webp", "ico", "svg", "raw", "psd", "ai", "eps", "pdf", "tga", "pcx", "pnm", "pbm", "pgm", "ppm", "xcf", "cr2", "nef", "orf", "srw", "raf", "dng", "rw2", "arw", "rwl", "mrw", "srf", "sr2", "mef", "erf", "mpo", "heif", "heic", "avif", "flif", "jpe", "jfif", "jif", "jff", "jng", "jnx", "heic", "jp2", "j2c", "j2k", "jpf", "jpm"].includes(extension)}
<svg class={classes} viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6H216 176 128 80c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z"/></svg>
{:else if ["js", "ts", "jsx", "tsx", "java", "c", "cpp", "py", "rb", "php", "swift", "go", "cs", "dart", "scala", "rust", "kotlin", "r", "lua", "perl", "html", "css"].includes(extension)}
<svg class={classes} viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM153 289l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L71 337c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM265 255l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
{:else} 
<!-- Folder -->
<svg class={classes} viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>
{/if}