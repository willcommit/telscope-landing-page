<script>
    import { loaded } from '../../stores'
    let show = true;

    loaded.subscribe((loaded) => {
        if (loaded === true) {
            show = false;
        }
    })

</script>

{#if show}
    <div class="se-pre-con" />
{/if}

<style>
    .se-pre-con {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: url("../../assets/logo.svg") center no-repeat rgb(0, 0, 0);
        background-size: 200px;
    }
</style>
