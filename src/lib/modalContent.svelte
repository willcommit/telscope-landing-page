<script>
import { onMount } from "svelte";

    import { activePresentation } from "../stores";

    let header;
    let text;
    let content;


    if (content != undefined) {
        activePresentation.subscribe((value) => {
            header = content.data[value].rubrik;
            text = content.data[value].text;
        });
    }

    onMount(() => {
        content = JSON.parse(localStorage.getItem("slides"));
    })
</script>

<div class="modalContent">
    <h1>{header}</h1>
    <div class="section">{@html text}</div>
</div>

<style>
    .modalContent {
        max-width: 700px;
    }

    .section {
        text-align: left;
    }
</style>
