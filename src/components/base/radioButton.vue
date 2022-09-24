<template>
    <label class="container"> One
        <input type="radio" checked="checked" name="radio">
        <span class="checkmark"></span>
    </label>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    @import '@/assets/scss/main.scss';

    /* Customize the label (the container) */
    .container {
        display: block;
        position: relative;
        padding-left: 100%;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default radio button */
    .container input {
        position: absolute;
        opacity: 0;
        // cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: #fff;
        border-radius: 50%;
        border: 2px solid transparent;
        transition: 200ms ease-in;
        border: 2px solid rgba(0,0,0, .05)
    }

    .checkmark span {
        white-space: nowrap;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input~.checkmark {
        border: 2px solid $stroke;
    }

    /* When the radio button is checked, add a blue background */
    .container input:checked~.checkmark {
        border: 2px solid $stroke;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .container input:checked~.checkmark:after {
        display: block;
    }

    .container input:checked~.checkmark span {
        font-family: "FHPSun-Bold";
        font-weight: normal;
    }

    /* Style the indicator (dot/circle) */
    .container .checkmark:after {
        top: 4px;
        left: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $active;
    }
</style>