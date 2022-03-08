<script>
    import { onMount } from "svelte";

    import { activePresentation } from "../stores";

    let url = "https://xbc452m8.directus.app/items/slides";
    let slides;
    let cache = JSON.parse(localStorage.getItem("slides"));


    async function getSlides() {
        const res = await fetch(url);
        const slides = await res.json();

        if (res.ok) {
            localStorage.setItem("slides", JSON.stringify(slides));
            cache = slides;
            return slides;
        } else {
            return cache;         
        }
    }

    let promise = getSlides();

    onMount(() => {
        promise = getSlides();
    });
</script>

{#await promise}
    <p>...waiting</p>
{:then slides}
    <div class="modalContent">
        <h1>{slides.data[$activePresentation].rubrik}</h1>
        <div class="section">{@html slides.data[$activePresentation].text}</div>
    </div>
{/await}

<style>
    .modalContent {
        max-width: 700px;
    }

    .section {
        text-align: left;
    }
</style>
