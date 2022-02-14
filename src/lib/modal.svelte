<script>
    import { fly, fade } from 'svelte/transition';

    let columnStart = 5;
    let columnEnd = 6;
    let show = true;
    export let content = "<h1>Default Text!</h1>"

    function toggle() {
		show = !show;
	}
</script>

{#if show}
    <div class="modal" transition:fly="{{ x: 200, duration: 1000 }}">
        <div class="modal-content" style="grid-column-start:{columnStart}; grid-column-end: {columnEnd}">
            <span class="close" on:click={toggle}>&times;</span>
            <div class="modal-text">
                {@html content}
            </div>
        </div>
    </div>
{:else}
    <button class="open" on:click={toggle} in:fly="{{ x: 200, duration: 2000 }}" out:fade>&#9432;</button>

{/if}

<style>
    .modal {
        display: grid;
        overflow-x: hidden;
        grid-template-columns: auto auto auto auto auto;
        position: absolute;
        z-index: 100;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 18px;
        border: none;
        margin: 1rem;
    }

    .modal-text {
        text-align: center;
        font-family: "Cinzel", serif;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .close {
        color: black;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .open {
        color: white;
        font-weight: bold;
        font-size: 30px;
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 100;
        border: none;
        outline: none;
        background: none;
        border-radius: 50px;
        height: 30px;
        height: 30px;
        cursor: pointer;
    }
</style>
