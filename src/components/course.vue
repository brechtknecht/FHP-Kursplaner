<template>
    <!-- <div class="course" :style="{'grid-column' : column}"> -->
      <div class="course" :style=coursePosition>
        <div class="course--checkbox">
            <input type="checkbox">
        </div>
        <div class="course--info">
            <h3> {{ this.$props.info.module.category }}  {{ this.$props.info.title }} </h3>
            <h4> {{ this.$props.info.teacher }} {{ this.$props.info.module.id }} — {{ this.$props.info.module.name }}</h4>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Course',
    props: {
        position: { row: String, start: Object, end: Object },
        info:     { title: String, teacher: String, module: { id: String, name: String, category: String }}
    },
    computed: {
      coursePosition () {
        let start = this.$props.position.start;
        let end = this.$props.position.end;

        let startPosition = ((start.hour.value - 9) * 100) + (start.minutes.value * (100/60));
        let endPosition =   ((end.hour.value - 9) * 100) + (end.minutes.value * (100/60));

        let offsetStart = Math.floor(startPosition / 100);
        let offsetEnd = Math.floor(endPosition / 100);

        console.log(offsetEnd);

        return {
          left: startPosition + offsetStart + 'px',
          width: (endPosition + offsetEnd) - (startPosition + offsetStart)  + 'px'
        }
      },
    },
    methods: {
      // Method that generates the position based on the time-range
      convertRange(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }
    }
  }
</script>

<style lang="scss">
    @import '../assets/scss/main.scss';

    .course {
      position: relative;
        &:hover {
          box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.15);
        }
        height: 100%;
        width: 100%;
        border-radius: 2rem;
        background: $c-TH;
        display: flex;
        transition: 250ms ease-in;
        .course--checkbox {
            display: flex;
            align-items: center;
            & input[type="checkbox"]{
                transform: scale(1.5);
                border-radius: 4px;
            }
            margin-left: 2rem;
        }
        .course--info {
            display: flex;
            flex-direction: column;
            overflow: auto;
            justify-content: center;
            align-items: flex-start;
            text-align: left;
            margin-left: 1.5rem;
        }
        h3 {
            margin-bottom: 0;
            overflow: hidden;
            width: 100%;
            height: 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        h4 {
            margin-top: .5rem
        }
    }
</style>