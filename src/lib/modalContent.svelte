<script>
    import { activePresentation } from "../stores";

    let header;
    let text;
    let content;

    content = JSON.parse(localStorage.getItem('slides'));

    activePresentation.subscribe((value) => {
        header = content.data[value].rubrik
        text = content.data[value].text
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
