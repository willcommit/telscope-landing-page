<script>
    import { activePresentation } from "../stores";
    import { content } from "../lib/3D/presentation";

    let htmlContent;

    activePresentation.subscribe((value) => {
        htmlContent = content[value];
    });
</script>

<div class="modalContent">
    <h1>{htmlContent.header}</h1>
    <div class="section">{htmlContent.section1}</div>
</div>

<style>
    .modalContent {
        max-width: 700px;
    }

    .section {
        text-align: left;
    }
</style>
