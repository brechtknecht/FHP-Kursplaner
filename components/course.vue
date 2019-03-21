<template>
    <div class="course" :style="{'grid-column' : column}">
        <div class="course--checkbox">
            <input type="checkbox">
        </div>
        <div class="course--info">
            <h3>Elementares Gestalten Basics: Eingabe Ausgabe: Self-powered Space Fashion</h3>
            <h4>Prof. Myriel Milicevic, Lina Wassong – 11EG-B</h4>
        </div>
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
        border-radius: 2rem;
        background: $c-TH;
        padding: .5rem 2rem;
        display: flex;
        .course--checkbox {
            display: flex;
            align-items: center;
            & input[type="checkbox"]{
                transform: scale(1.5);
                border-radius: 4px;
            }
        }
        .course--info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 1.5rem;
        }
        h4 {
            margin-top: .5rem
        }
    }
</style>