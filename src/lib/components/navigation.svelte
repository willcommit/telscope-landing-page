<script>
    import { activePresentation, presentations } from "../../stores.js";
    // import { presentations } from "./3D/presentation";

    let forwardFilled = true;
    let backwardFilled = false;
    let i = 0;

    function forwardClick() {
        if (i < $presentations.length - 1) {
            forwardFilled = true;
            backwardFilled = true;
            i += 1;
        }
        
        if (i === $presentations.length - 1) {
            forwardFilled = false;
        }

        $activePresentation = i;
    }

    function backwardClick() {
        if (i > 0) {
            i -= 1;
            forwardFilled = true;
            backwardFilled = true;
        }
        
        if (i === 0) {
            backwardFilled = false;
        }

        $activePresentation = i;
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
                    opacity="0.3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                    fill="black"
                />
            </svg>
        </div>
    </button>
    <div class="label">
        <div class="inner">{$presentations[i].slide}</div>
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
                    opacity="0.3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                    fill="black"
                />
            </svg>
        </div>
    </button>
</div>

<style>
    .navigation {
        color: white;
        position: absolute;
        z-index: 100;
        margin: 1rem;
        width: 200px;
        top: calc(100vh - 45px - 58px);
        left: calc(50% - 262px / 2);
        width: 262px;
        height: 58px;
        background-color: hsla(0, 0%, 97%, 0.25);
        backdrop-filter: blur(5px);
        border-radius: 29px;
        box-shadow: 0px 30px 70px rgb(60 0 189 / 13%);
        will-change: transform;
        cursor: default;
        z-index: 45;
        user-select: none;
        opacity: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: center;
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
        fill: white;
        opacity: 1;
    }

    .backwardFilled svg * {
        fill: white;
        opacity: 1;
    }

    button svg *:hover,
    .button svg *:focus {
        fill: #29d9ef;
    }

</style>
