<script>
    import { activePresentation, presentations } from "../stores";

</script>

<div class="modalContent">
    <h1>{$presentations[$activePresentation].slide}</h1>
    <div class="section">{@html $presentations[$activePresentation].text}</div>
</div>

<style>
    .modalContent {
        max-width: 700px;
    }
    .section {
        text-align: left;
    }
</style>