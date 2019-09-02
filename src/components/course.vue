<template>
  <!-- <div class="course" :style="{'grid-column' : column}"> -->
  <div  class="course"
        :class="{ 
          selected: isSelected,
          remembered: isRemembered,
          conflict: hasConflict
        }" 
        :style="[soursePosition, courseBackground]" 
        @click.self="setCurrentCourse">
    <div class="course--checkbox">
      <Checkbox :id="this.$props.info._id" ></Checkbox>
    </div>
    <div class="course--info" @click="setCurrentCourse">
      <h3> {{ this.$props.info.title }} </h3>
      <h4> {{ this.$props.info.teacher }} — {{ this.$props.info.module.name }}</h4>
    </div>
  </div>
</template>

<script>
  import store, {
    mapState,
    mapMutations
  } from 'vuex'

  import Checkbox from '@/components/base/checkbox'

  export default {
    name: 'Course',
    components: {
      Checkbox
    },
    props: {
      position: {
        row: String,
        start: Object,
        end: Object
      },
      info: {
        _id: String,
        title: String,
        teacher: String,
        module: {
          id: String,
          name: String,
          category: String
        },
        colorCode: String,
        subtitle: String
      }
    },
    computed: {
      /* Calculates the Position of the Line in the Grid */
      soursePosition() {
        let columnWidth = 150;

        let start = this.$props.position.start;
        let end = this.$props.position.end;

        let startPosition = ((start.hour.value - 9) * columnWidth) + (start.minutes.value * (columnWidth / 60));
        let endPosition = ((end.hour.value - 9) * columnWidth) + (end.minutes.value * (columnWidth / 60));

        let offsetStart = Math.floor(startPosition / columnWidth);
        let offsetEnd = Math.floor(endPosition / columnWidth);



        return {
          left: startPosition + offsetStart + 'px',
          width: (endPosition + offsetEnd) - (startPosition + offsetStart) + 'px',
        }
      },
      courseBackground() {
        let colorCode = this.$props.info.colorCode;

        return {
          background: colorCode
        }
      },
      isSelected() {
        if (this.$props.info._id == this.$store.state.currentCourse._id && this.$store.state.view.detailsSelected) {
          return true;
        }
        return false
      },
      isRemembered() {
        let rememberedCoursesRef = this.$store.state.user.rememberedCourses;
        let id = this.$props.info._id;

        // Disable colorCoding on selected Courses Screen
        if(this.$store.state.queries.studyType == "selectedCourses") {
          return false;
        }

        if (rememberedCoursesRef.includes(id)) {
          return true;
        }

        return false;
      },
      hasConflict () {
        if(this.$store.state.queries.studyType == "selectedCourses"){
          let days = this.$store.state.courses.days;

          for(var i = 0; i < days.length; i++){
            if(days[i].data.length > 1) {
              console.log('i', i, 'day', this.$props.position.start.day.value);
              if(this.$props.position.start.day.value - 1 == i) {
                console.log('Potential Conflict @index: ' + i +' ⚠️ detected');
                return true;
              }
            }
          }

        } else {
          return false;
        }

      }
    },
    methods: {
      setCurrentCourse: function () {
        this.$store.commit('SET_CURRENT_COURSE', this.$props.info);
        this.$store.commit('VIEW_DETAILS_SELECTED', true);
        this.$emit('CURRENT_COURSE_TRIGGERED');
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/main.scss';

  .selected {
    border: 3px solid $active !important;
  }

  .conflict {
    top: 0.5rem;
    bottom: 0.5rem;
    border: 3px solid $warn !important;
    &:before {
      position: absolute;
      font-size: 0.8rem;
      font-family: 'FHPSun-Regular';
      top: -1.5rem;
      color: $warn;
      content: 'Achtung— dieser Kurs findet zeitgleich mit einem anderen Kus statt.'
    }
  }

  .remembered {
    background: $active !important;

    .course--info {

      h3,
      h4 {
        color: #fff !important;
      }

    }
  }

  .course {
    position: relative;

    &:hover {
      border: 3px solid $active;
    }

    height: 100%;
    width: 100%;
    border-radius: 1.5rem;
    background: $c-TH;
    display: flex;
    transition: background $animation-fast;
    cursor: pointer;
    border: 3px solid transparent;

    .course--checkbox {
      display: flex;
      align-items: center;

      & input[type="checkbox"] {
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
      line-height: 1.5rem;
    }
  }
</style>