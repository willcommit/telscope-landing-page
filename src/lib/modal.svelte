<script>
    import { fly, fade } from "svelte/transition";
    import ModalContent from "./modalContent.svelte";

    let show = true;

    function toggle() {
        show = !show;
    }
</script>

{#if show}
    <div class="modal-bg" transition:fly={{ x: 200, duration: 1000 }}>
        <div class="modal">
            <span class="close" on:click={toggle}
                ><svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20px"
                    height="20px"
                    ><path
                        d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
                    /></svg
                >
            </span>
            <ModalContent />
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
    .modal-bg {
        display: flex;
        justify-content: right;
        justify-items: right;
        overflow-x: hidden;
        position: absolute;
        z-index: 40;
        right: 0;
        top: 0;
        width: 100%;
        height: 100vh;
    }

    .modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: hsla(0, 0%, 97%, 0.25);
        backdrop-filter: blur(5px);
        padding: 1em;
        border-radius: 18px;
        border: none;
        margin: 1rem;
        text-align: center;
        font-weight: 100;
        color: white;
        overflow-y: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .modal::-webkit-scrollbar {
        display: none;
    }

    .close {
        margin-left: auto;
    }

    .close svg *:hover,
    .close svg *:focus {
        fill: #29d9ef;
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
        .modal-bg {
            justify-content: center;
            margin-top: 2rem;
            max-height: 500px;
        }
    }
</style>
