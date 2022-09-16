<template>
  <!-- <div class="course" :style="{'grid-column' : column}"> -->
  <div class="course"
        :class="{ 
          selected: isSelected,
          remembered: isRemembered,
          conflict: hasConflict
        }" 
        :style="[soursePosition, courseBackground]" 
        @click.self="setCurrentCourse">
    <div class="course--checkbox">
      <Checkbox 
        :id="this.$props.info.id" 
        :key="this.$props.info.id"
        :isClickable="true"
      ></Checkbox>
    </div>
    <div class="course--info" @click="setCurrentCourse">
      <h3> {{ currentCourseTitle.title }} </h3>
      <div class="course--sub">
        <div v-if="this.$props.info.teacher">
          <h4 v-for="(teacher, index) in this.$props.info.teacher" :key="teacher" style="display: inline-block">
            {{teacher}} 
            {{ (index == this.$props.info.teacher.length - 1) ? "" : "&amp;&nbsp;" }}
          </h4>
          <h4 style="display:inline-block">—</h4>
        </div>  
        <div class="course--bubble">
          <h4 style="font-feature-settings: 'tnum'">{{ moduleNameStringify }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
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
        id: String,
        title: String,
        teacher: String,
        module: {
          id: String,
          id_new: String,
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

        // 👋 Excape for wrong end Values
        if(end.hour.value == '00') {
          end.hour.value = 22;
        }

        let BORDER_WIDTH = 2;

        let startPosition = ((start.hour - 9) * columnWidth) + (start.minutes * (columnWidth / 60));
        let endPosition = ((end.hour - 9) * columnWidth) + (end.minutes * (columnWidth / 60));

        let offsetStart = Math.floor(startPosition / columnWidth) - BORDER_WIDTH;
        let offsetEnd = Math.floor(endPosition / columnWidth) - BORDER_WIDTH;

        return {
          left: startPosition + offsetStart + 'px',
          width: (endPosition + offsetEnd) - (startPosition + offsetStart) + 'px',
        }
      },
      currentCourseTitle () {
          let regExBeforeComma = new RegExp(/[^:]*/);
          let regExAfterComma = new RegExp(/(:\s)(.*)/);

          let category = regExBeforeComma.exec(this.$props.info.title);
          let title = regExAfterComma.exec(this.$props.info.title);

          if(category == null) {category= ['undefined']}
          if(title == null) { title = category;}

          title = title[0].replace(': ', '');

          return {
              category: category[0],
              title: title
          }
      },
      moduleNameStringify() {
        let string = this.$props.info.module.name;
        return string;
      },
      courseBackground() {
        let colorCode = this.$props.info.colorCode;

        return {
          background: colorCode
        }
      },
      isSelected() {
        if (this.$props.info.id == this.$store.state.currentCourse.id && this.$store.state.view.detailsSelected) {
          return true;
        }
        return false
      },
      isRemembered() {
        // let rememberedCoursesRef = this.user.rememberedCourses;
        let id = this.$props.info.id;

        // Disable colorCoding on selected Courses Screen
        if(this.$store.state.queries.studyType == "selectedCourses") {
          return false;
        }

        if (this.$store.state.user.rememberedCourses.includes(id)) {
          return true;
        } else {
          return false;  
        }

        
      },
      hasConflict () {
        if(this.$store.state.queries.studyType == "selectedCourses"){
          let days = this.$store.state.courses.days;

          for(var i = 0; i < days.length; i++){
            console.log(days[i])

            if(days[i].data.length > 1) {
              if(this.$props.position.start.day.value - 1 == i) {
                console.log('Diese Kurse sind am selben tag... start comparing');
                console.log(this.$props.position.start)

                // return true;
                return false;
              }
            }
          }

        } else {
          return false;
        }
        return undefined;
      },
      ...mapState([
        'queries',
        'user'
      ])
    },
    methods: {
      setCurrentCourse: function () {
        console.log(this.$props)
        this.$store.commit('SET_CURRENT_COURSE', this.$props.info);
        this.$store.commit('VIEW_DETAILS_SELECTED', true);
        this.$emit('CURRENT_COURSE_TRIGGERED');

        document.body.classList.toggle('modal-open');
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/main.scss';

  .course {
    @include for-tablet-portrait-up () {
      margin-top: .5rem;
      margin-bottom: .5rem;
      left: 0 !important;
      width: calc(100% - 1rem) !important; 
    }
    &:before {
      content: " ";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 0.5px solid #EFEFEF;
      border-radius: 8px;
    }
  }

  .selected {
    clip-path: none !important;
    border: 3px solid $active !important;
  }

  .conflict {
    top: 0.5rem;
    bottom: 0.5rem;
    border: 2px solid $warn !important;
    clip-path: none !important;
    margin-top: 1rem;
    &:before {
      position: absolute;
      font-size: 0.8rem;
      font-family: 'FHPSun-Regular';
      top: -1.5rem;
      color: $warn;
      content: 'Achtung— dieser Kurs findet zeitgleich mit einem anderen Kurs statt.'
    }
  }

  .remembered {
    // clip-path: inset(0 round 1.5rem) !important; 
    clip-path: inset(0 round 8px) !important; 
    background: $active !important;

    .course--info {
      h3,
      h4 {
        color: #fff !important;
      }

      h4 {
        display: flex;
      }

    }
  }

  .course {
    position: relative;
    outline: 0;

    &:hover {
      border: 3px solid $active;
      clip-path: inset(0 round 8px);
      border-radius: 9.5px;
    }

    height: calc(100% - 6px);
    width: 100%;
    // border-radius: 1.5rem;
    border-radius: 8px;
    // clip-path: inset(3px round 1.5rem);
    clip-path: inset(3px round 8px);
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

      .container {
        left: 0 !important;
      }

      margin: 0 .5rem 0 0.25rem;
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


    .course--sub {
      padding-top: .3rem;
      div:last-child {
        margin-bottom: 0.7rem;
      }
      div {
        display: inline-block;
        h4 {
          margin-bottom: 0;
        }
      }

      .course--bubble {
        padding: 0.25rem 0.5rem;
        background: hsla(0,0%,100%,.6);
        border-radius: 4px;
      }
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
      margin-top: 0;
      margin-bottom: 1.1rem;
      line-height: 1.5rem;
    }
  }
</style>