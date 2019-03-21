<template>
    <div class="course" :style="{'grid-column' : column}">
        <h3>Elementares Gestalten Basics: Eingabe Ausgabe: Self-powered Space Fashion</h3>
        <h4>Prof. Myriel Milicevic, Lina Wassong – 11EG-B</h4>
    </div>
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

<style lang="scss">
    @import '@/assets/scss/main.scss';

    .course {
        height: 100%;
        width: 100%;
        border-radius: 12px;
        background: $c-TH;
        padding: .5rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        h4 {
            margin-top: .5rem
        }
    }
</style>