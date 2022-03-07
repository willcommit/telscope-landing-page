<script>
  import { onMount } from "svelte";
  import { createCanvas } from "./lib/3D/canvas";
  import Modal from "./lib/modal.svelte";
  import Logo from "./lib/logo.svelte";
  import Navigation from "./lib/navigation.svelte";
  import Loader from "./lib/loader.svelte";
  import FullscreenBtn from "./lib/fullscreenBtn.svelte";
  import TelscopeBtn from "./lib/telscopeBtn.svelte";

  let bg;
  let url = "https://xbc452m8.directus.app/items/slides";

  onMount(async () => {
    await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Bad request");
                }
                return response.json();
            })
            .then((result) => {
                localStorage.setItem("slides", JSON.stringify(result))
            })
            .catch((error) => {
                console.error("There is a problem with the CMS API:", error);
            });

    createCanvas(bg);
  });
</script>

<main>
  <canvas bind:this={bg} />
  <Loader />
  <Logo />
  <TelscopeBtn />
  <Navigation />
  <Modal />
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
