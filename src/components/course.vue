<template>
    <!-- <div class="course" :style="{'grid-column' : column}"> -->
      <div class="course" :style=coursePosition @click="setCurrentCourse">
        <div class="course--checkbox">
            <input type="checkbox">
        </div>
        <div class="course--info">
            <h3> {{ this.$props.info.title }} </h3>
            <h4> {{ this.$props.info.teacher }} — {{ this.$props.info.module.id }}</h4>
        </div>
    </div>
</template>

<script>
  import store, { mapState, mapMutations }  from 'vuex'

  export default {
    name: 'Course',
    props: {
        position: { row: String, start: Object, end: Object },
        info:     { title: String, teacher: String, module: { id: String, name: String, category: String }}
    },
    computed: {
      /* Calculates the Position of the Line in the Grid */ 
      coursePosition () {
        let columnWidth = 150;

        let start = this.$props.position.start;
        let end = this.$props.position.end;

        let startPosition = ((start.hour.value - 9) * columnWidth) + (start.minutes.value * (columnWidth/60));
        let endPosition =   ((end.hour.value - 9) * columnWidth) + (end.minutes.value * (columnWidth/60));

        let offsetStart = Math.floor(startPosition / columnWidth);
        let offsetEnd = Math.floor(endPosition / columnWidth);

        return {
          left: startPosition + offsetStart + 'px',
          width: (endPosition + offsetEnd) - (startPosition + offsetStart)  + 'px'
        }
      }
    },
    methods: {
        setCurrentCourse: function () {
          this.$store.commit('SET_CURRENT_COURSE', this.$props.info);
          this.$emit('CURRENT_COURSE_TRIGGERED');
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
        border-radius: 4rem;
        background: $c-TH;
        display: flex;
        transition: $animation-default;
        cursor: pointer;
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
            margin-right: 2rem;
        }
        h3 {
            margin-top: 1rem;
            margin-bottom: 0;
            overflow: hidden;
            width: 100%;
            height: 1.3rem;
            line-height: 1.3rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        h4 {
            margin-top: .5rem;
            margin-bottom: 1.1rem;
        }
    }
</style>