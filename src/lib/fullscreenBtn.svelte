<script>
    function toggle() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
</script>

<button class="open" on:click={toggle}></button>

<style>
   .open {
        width: 40px;
        height: 40px;
        color: white;
        font-weight: normal;
        position: absolute;
        left: 1rem;
        bottom: 1rem;
        z-index: 100;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        background: url("../assets/fullscreen.svg") center no-repeat transparent;
        transition: all .2s ease-in-out;
    }

    .open:hover,
    .open:focus {
        color: #29D9EF;
        transform: scale(1.1);
    }
</style>
