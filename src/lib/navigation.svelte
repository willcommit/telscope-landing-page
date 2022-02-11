<script>
    import { activeCamera, showModal } from "../stores.js";
    import { cameras} from "./3D/camera";

    $: forwardFilled = true;
    $: backwardFilled = false;
    let i = 0;

    function forwardClick() {
        if (i < cameras.length - 1) {
            forwardFilled = true;
            backwardFilled = true;
            i += 1;
        } else if (i === cameras.length-1) {
            forwardFilled = false;
        }

        $activeCamera = cameras[i].id 
    }

    function backwardClick() {
        if (i > 0) {
            i -= 1;
            forwardFilled = true;
            backwardFilled = true;
        } else if (i === 0) {
            backwardFilled = false;
        }

        $activeCamera = cameras[i].id 
    }
</script>

<div class="navigation">
    <button on:click={backwardClick} class="arrow">
        <div class="icon-backward" class:backwardFilled>
            <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                    fill="white"
                />
            </svg>
        </div>
    </button>
    <div class="label">
        <div class="inner">{cameras[i].name}</div>
    </div>
    <button on:click={forwardClick} class="arrow">
        <div class="icon-forward" class:forwardFilled>
            <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                    fill="white"
                />
            </svg>
        </div>
    </button>
</div>

<style>
    .navigation {
        position: absolute;
        z-index: 100;
        margin: 1rem;
        width: 200px;
        top: calc(100vh - 45px - 58px);
        left: calc(50% - 262px / 2);
        width: 262px;
        height: 58px;
        background: #fff;
        border-radius: 29px;
        box-shadow: 0px 30px 70px rgb(60 0 189 / 13%);
        will-change: transform;
        cursor: default;
        z-index: 3;
        user-select: none;
        opacity: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    button {
        border: none;
        outline: none;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 55px;
        height: 100%;
        cursor: pointer;
    }

    .icon-forward {
        transform: rotate(270deg);
    }

    .icon-backward {
        transform: rotate(90deg);
    }

    .forwardFilled svg * {
        fill: black;
    }

    .backwardFilled svg * {
        fill: black;
    }
</style>
