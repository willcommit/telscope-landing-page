<script>
    import { fly, fade } from "svelte/transition";

    let show = false;

    function toggle() {
        show = !show;
    }
</script>

{#if show}
    <div class="modal" transition:fly={{ x: -200, duration: 1000 }}>
        <iframe
            title="telscope app"
            width="1920"
            height="1080"
            src="https://demo.telscope.no/auth/login-page"
            frameborder="0"
        />
    </div>
{/if}

<button class="open" on:click={toggle} />

<style>
    .modal {
        position: absolute;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        z-index: 80;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
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
        transition: all 0.2s ease-in-out;
    }

    .open:hover,
    .open:focus {
        color: #29d9ef;
        transform: scale(1.1);
    }

    iframe {
        width: 1920px;
        height: 1080px;
        transform: scale(0.75);
    }

    @media (max-width: 1920px) {
        iframe {
            transform: scale(0.5);
        }   
    }

    @media (max-width: 1000px) {
        .open {
            display: none;
        }
    }
</style>
