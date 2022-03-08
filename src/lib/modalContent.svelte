<script>
    import { onMount } from "svelte";

    import { activePresentation } from "../stores";

    let url = "https://xbc452m8.directus.app/items/slides";
    let header;
    let text;
    let cache;
    let slides;

    cache = JSON.parse(localStorage.getItem("slides"));

    activePresentation.subscribe((value) => {
        if (cache != undefined) {
            header = cache.data[value].rubrik;
            text = cache.data[value].text;
        }
    });

    onMount(async () => {
        await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Bad request");
                }
                return response.json();
            })
            .then((result) => {
                cache = result;
                // header = result.data[0].rubrik;
                // text = result.data[0].text;
                localStorage.setItem("slides", JSON.stringify(result));
            })
            .catch((error) => {
                console.error("There is a problem with the CMS API:", error);
            });
    });
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
