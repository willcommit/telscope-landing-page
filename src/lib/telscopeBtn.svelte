<script>
    import { fly, fade } from "svelte/transition";

    let show = false;

    function toggle() {
        show = !show;
    }
</script>

{#if show}
    <div class="modal" transition:fly={{ x: -200, duration: 1000 }}>
        <div class="modal-content">
            <iframe title="telscope app" src="https://demo.telscope.no/auth/login-page" frameborder="0"></iframe>    
        </div>
    </div>

{/if}

<button class="open" on:click={toggle}></button>

<style>
    .modal {
        position: absolute;
        display: grid;
        overflow-x: hidden;
        grid-template-columns: auto auto auto auto auto;
        grid-template-rows: auto auto auto auto;
        position: absolute;
        z-index: 80;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
    }

    .modal-content {
        display: flex;
        grid-column-start: 1;
        grid-column-end: 6;
        grid-row-start: 1;
        grid-row-end: 5;
        background-color: white;
        padding: 20px;
        border-radius: 18px;
        border: none;
        margin: 6rem;
    }

    .open {
        width: 40px;
        height: 40px;
        color: white;
        font-weight: normal;
        font-size: 30px;
        position: absolute;
        left: 1rem;
        bottom: 5rem;
        z-index: 100;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        background: url("../assets/app.svg") center no-repeat transparent;
        transition: all .2s ease-in-out;
    }

    .open:hover,
    .open:focus {
        color: #29D9EF;
        transform: scale(1.1);
    }

    iframe {
        align-items: center;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1000px) {
        .open {
            display: none;
        }
    }
</style>
