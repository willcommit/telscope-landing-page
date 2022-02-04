<script>
    import { showModal } from "../stores.js";
    let show;
    showModal.subscribe((value) => {
        show = value;
        console.log(show);
    });
</script>

{#if show}
    <div class="modal">
        <div class="modal-content">
            <span class="close" on:click={() => ($showModal = false)}
                >&times;</span
            >
            <div class="modal-text">
                <h1>KÖP TELSCOPE!</h1>
                <p>
                    Bästa loggboken
                </p>
                <br />
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: absolute;
        z-index: 100;
        position: fixed;
        z-index: 1;
        padding-top: 80px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: white;
        margin: auto;
        padding: 20px;
        border-radius: 18px;
        border: none;
        width: 40%;
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

    .modal-text h1 {
        font-size: 40px;
        font-weight: 700;
        margin: 0;
    }

    .modal-text p a {
        margin: 0;
        margin-bottom: 3rem;
    }

    .modal-text a {
        outline-style: none;
        color: #f5f5f5;
    }

    .disclaimer {
        text-align: left;
        font-size: 9px;
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
</style>
