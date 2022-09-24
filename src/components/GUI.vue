<template>
  <div class="overlay" @click="toggleSupport">
    <img src="/assets/icons/ic-help.svg"/>
  </div>
</template>

<script>
export default {
    methods: {
        toggleSupport () {
            this.$store.state.user.toggleSupport = true
        }
    }
}
</script>

<style lang="scss" scoped>
    .overlay {
        position: fixed;
        bottom: 2.5rem;
        right: 2.5rem;
        cursor: pointer;
        z-index: 10;
    }
</style>