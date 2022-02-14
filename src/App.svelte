<script>
  import { activePresentation } from "./stores";
  import { presentations } from "./lib/3D/presentation";

  import { onMount } from "svelte";
  import { createCanvas } from "./lib/3D/canvas";
  import Modal from "./lib/modal.svelte";
  import Logo from "./lib/logo.svelte";
  import Navigation from "./lib/navigation.svelte";

  let bg;
  let presentation;

  onMount(() => {
    createCanvas(bg);
  });

  activePresentation.subscribe((value) => {
    presentation = presentations[value];
  });

  const promise = () => new Promise((res) => setTimeout(res, 3000));
</script>

<main>
  <canvas bind:this={bg} />

  {#await promise}
    <div class="se-pre-con" />
  {:then number}
    <Logo />
    <Navigation />
    <Modal content={presentation.name} />
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}

</main>

<style>
  .se-pre-con {
    position: absolute;
    left: 100px;
    top: 0;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url("./assets/logo.png") center no-repeat rgb(0, 0, 0);
  }
  @media (min-width: 480px) {
  }
</style>
