<script>
  import { onMount } from "svelte";
  import { createCanvas } from "./lib/3D/canvas";
  import Modal from "./lib/modal.svelte";
  import Logo from "./lib/logo.svelte";
  import Navigation from "./lib/navigation.svelte";
  import Loader from "./lib/loader.svelte";
  import FullscreenBtn from "./lib/fullscreenBtn.svelte";
  import TelscopeBtn from "./lib/telscopeBtn.svelte";
  import { presentations } from "./stores";

  let bg;

  const url = "https://xbc452m8.directus.app/items/slides";
  const cache = JSON.parse(localStorage.getItem("slides"));

  async function getSlides() {
    try {
      const res = await fetch(url);
      const slides = await res.json();

      if (res.ok) {
        localStorage.setItem("slides", JSON.stringify(slides));
        $presentations.forEach((presentation, index) => {
          presentation.id = slides.data[index].id;
          presentation.slide = slides.data[index].rubrik;
          presentation.text = slides.data[index].text;
        });
      } else {
        $presentations.forEach((presentation, index) => {
          presentation.id = cache.data[index].id;
          presentation.slide = cache.data[index].rubrik;
          presentation.text = cache.data[index].text;
        });
      }
    } catch {
      $presentations.forEach((presentation, index) => {
        presentation.id = cache.data[index].id;
        presentation.slide = cache.data[index].rubrik;
        presentation.text = cache.data[index].text;
      });
    }
  }

  let promise = getSlides();

  onMount(() => {
    promise = getSlides();

    createCanvas(bg);
  });
</script>

<main>
  <canvas bind:this={bg} />
  <Loader />
  <Logo />
  <TelscopeBtn />
  {#await promise then value}
    <Navigation />
    <Modal />
  {/await}
  <FullscreenBtn />
</main>

<style>
  :global(body) {
    font-family: "Roboto", sans-serif;
    margin: 0;
    overflow: hidden;
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
