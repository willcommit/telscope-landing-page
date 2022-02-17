<script>
    import { fly, fade } from "svelte/transition";

    let show = true;
    export let content = "<h1>Default Text!</h1>";

    function toggle() {
        show = !show;
    }
</script>

{#if show}
    <div class="modal" transition:fly={{ x: 200, duration: 1000 }}>
        <div class="modal-content">
            <span class="close" on:click={toggle}>&times;</span>
            <div class="modal-text">
                {@html content}
            </div>
        </div>
    </div>
{:else}
    <button
        class="open"
        on:click={toggle}
        in:fly={{ x: 200, duration: 2000 }}
        out:fade
        >&#9432;
    </button>
{/if}

<style>
    .modal {
        display: grid;
        overflow-x: hidden;
        grid-template-columns: auto auto auto auto auto;
        grid-template-rows: auto auto auto auto;
        position: absolute;
        z-index: 40;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
    }

    .modal-content {
        grid-column-start: 5;
        grid-column-end: 6;
        grid-row-start: 1;
        grid-row-end: 5;
        background-color: hsla(0, 0%, 97%, 0.25);
        backdrop-filter: blur(5px);
        padding: 20px;
        border-radius: 18px;
        border: none;
        margin: 1rem;
    }

    .modal-text {
        text-align: center;
        font-weight: 100;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .close {
        position: absolute;
        color: white;
        font-weight: 100;
        top: 0.5rem;
        right: 1.2rem;
        font-size: 28px;
    }

    .close:hover,
    .close:focus {
        color: #29d9ef;
        text-decoration: none;
        cursor: pointer;
    }

    .open {
        color: white;
        font-weight: normal;
        font-size: 30px;
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 100;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .open:hover,
    .open:focus {
        color: #29d9ef;
        transform: scale(1.1);
    }

    @media (max-width: 1000px) {
        .modal-content {
            grid-column-start: 1;
            grid-column-end: 6;
            grid-row-start: 1;
            grid-row-end: 2;
            margin-top: 3em;
        }
    }
</style>
