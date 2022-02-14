<script>
    import { onMount } from "svelte";

    //import spinner from "../assets/loading.gif";
    let show = false;

    function toggle() {
		show = true;
	}

    

    onMount(async () => {
        setTimeout(toggle, 1000)
    });
</script>

{#if show}

{/if}

<style>
    
</style>
