<script>
  import { activePresentation } from "./stores";
  import { presentations } from "./lib/3D/presentation";

  import { onMount } from "svelte";
  import { createCanvas } from "./lib/3D/canvas";
  import Modal from "./lib/modal.svelte";
  import Logo from "./lib/logo.svelte";
  import Navigation from "./lib/navigation.svelte";
  import Loader from "./lib/loader.svelte";

  let bg;
  let presentation;

  onMount(() => {
    createCanvas(bg);
  });

  activePresentation.subscribe((value) => {
    presentation = presentations[value];
  });
</script>

<main>
  <canvas bind:this={bg} />
  <Loader />
  <Logo />
  <Navigation />
  <Modal content={presentation.name} />
</main>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }

</style>
