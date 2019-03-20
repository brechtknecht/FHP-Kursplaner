<template>
  <div class="course" :style="{'grid-column' : column}">Interfaces de–constructed</div>
</template>

<script>
  export default {
    name: 'Course',
    props: {
        position: { row: String, start: String, end: String}
    },
    computed: {
      column () {
        return parseInt(this.$props.position.start) + ' / span ' + parseInt(this.$props.position.end - this.$props.position.start);
      }
    }
  }
</script>

<style>
    .course {
        height: 100%;
        width: 100%;
        border-radius: 12px;
        background: red;
        padding: .5rem 1rem;
    }
</style>