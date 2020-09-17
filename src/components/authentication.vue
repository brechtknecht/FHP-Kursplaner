<template>
    <div class="authentication--container" @click.self="toggleAuthentication">
        <div class="authentication--modal">
            Authentication Modal Test
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toggleAuthentication () {
            this.$store.state.user.toggleAuth = false;
            console.log("clicked")
        }
    }
}
</script>

<style lang="scss">
    .authentication--container {
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(0, 0, 0, .15);
    }
    .authentication--modal {
        position: relative;
        top: 50%; bottom: 50%; left: 50%; right: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: #fff;
        width: 60%;
        height: 60%;
        z-index: 100;
        border-radius: 8px;
        border: 1px solid red;
    }
</style>