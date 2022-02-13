<script>

  import { activePresentation } from './stores';
  import { presentations } from './lib/3D/presentation'

  import { onMount } from 'svelte'
  import { createCanvas } from "./lib/3D/canvas"
  import Modal from "./lib/modal.svelte"
  import Logo from "./lib/logo.svelte"
  import Navigation from "./lib/navigation.svelte"

  let bg;
  let presentation;

  onMount(() => {
    createCanvas(bg)
  })

  activePresentation.subscribe((value) => {
    presentation = presentations[value];
  })

</script>

<main>
  <canvas bind:this={bg}></canvas>
  <Logo></Logo>
  <Navigation></Navigation>

  <Modal content={presentation.name}></Modal>

  
</main>

<style>

  @media (min-width: 480px) {

  }
</style>
