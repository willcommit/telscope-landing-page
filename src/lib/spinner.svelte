<script>
    import { onDestroy, onMount } from "svelte";

    let show = true;

    onMount(() =>{
        setTimeout(() => (show = false), 3000);
    })
</script>

{#if show}
    <div class="se-pre-con" />
{/if}

<style>
    .se-pre-con {
        position: absolute;
        left: 100px;
        top: 0;
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: url("../assets/logo.png") center no-repeat rgb(0, 0, 0);
    }
</style>
