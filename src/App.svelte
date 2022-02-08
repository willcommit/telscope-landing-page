<script>
  // import logo from './assets/svelte.png'
  // import Counter from './lib/Counter.svelte'

  import { onMount } from 'svelte'
  import { createCanvas } from "./lib/3D/canvas"
  import Modal from "./lib/modal.svelte"
  import Logo from "./lib/logo.svelte"
  import Navigation from "./lib/navigation.svelte"

  let bg;

  onMount(() => {
    createCanvas(bg)
  })

</script>

<main>
  <canvas bind:this={bg}></canvas>
  <Logo></Logo>
  <Navigation></Navigation>
  <Modal></Modal>
</main>

<style>

  @media (min-width: 480px) {

  }
</style>
