<template>
  <div class="course-canvas">
    <div class="timeline">
      <div class="time-indicator" :style="currentTimePosition"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
      <div class="number"></div>
    </div>
    <div class="numbers">
      <span>09:00</span>
      <span>10:00</span>
      <span>11:00</span>
      <span>12:00</span>
      <span>13:00</span>
      <span>14:00</span>
      <span>15:00</span>
      <span>16:00</span>
      <span>17:00</span>
      <span>18:00</span>
      <span>19:00</span>
      <span>20:00</span>
      <span>21:00</span>
      <span>22:00</span>
    </div>
    <div v-if="!courses.status" class="course-loader"></div>
    <div 
      :class="'overview ' + courses.string"
      :day=courses.string
      v-for="courses in courses.days"
      :key="courses.key"
      v-in-viewport>

      <div class="overview-head"> 
        <h1 class="regular">{{ courses.string }}</h1>
      </div>
      <div class="course-wrapper" v-for="(course, index) in courses.data" :key="course.id">
        <course
          :id ="course._id"
          :position="{ 
            row: index,
            start:    course.attributes.time.fixture.begin,
            end:      course.attributes.time.fixture.end,
          }" 
          :info="{
            _id:      course._id,
            title:    course.attributes.title,
            teacher:  course.attributes.teacher,
            module: {
              id:     course.attributes.module.id,
              name:   course.attributes.module.name,
              category: course.attributes.module.category,
            },
            description: course.attributes.descriptionText.value,
            time: course.attributes.time,
            room: course.attributes.room,
            credits: course.attributes.credits,
            colorCode: course.attributes.colorCode,
            subtitle: course.attributes.subtitle
          }"
          @CURRENT_COURSE_TRIGGERED="passTrigger"
          ></course>
        </div>
      </div>
    </div>
</template>

<script>
  import Course from '@/components/course.vue';

  import { mapState } from 'vuex'
  import { log } from 'util';

  export default {
    components : {
      Course
    },
    created () {
      window.addEventListener('scroll', () => {
        this.scrollListener();
      });
    
      this.$store.dispatch('loadCourses', this.queries).then(() => {
        this.$store.commit('QUERY_COURSES');
      });
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.scrollListener);
    },
    computed: {
      currentTimePosition: function() {
          let date = new Date();
          let hours = date.getHours();
          let minutes = date.getMinutes();

          let columnWidth = 150;

          let startPosition = ((hours - 9) * columnWidth) + (minutes * (columnWidth / 60));
          let offsetStart = Math.floor(startPosition / columnWidth);

          return {
            left: startPosition + offsetStart + 'px',
          }
      },
      ...mapState([
        'courses',
        'queries'
      ])
    },
    methods: {
      passTrigger: function () {
        this.$emit('CURRENT_COURSE_TRIGGERED');
      },
      tastyTest: function () {
        console.log('ficky');
      },
      scrollListener: function (e) {
        let days = document.getElementsByClassName('overview');
        let displayedDays = [];
        for (var item of days) {
          if(item.classList.contains('in-viewport')){
            displayedDays.push(item.getAttribute('day'));
          }
        }

        this.$store.commit('SET_ACTIVE_DAYS', displayedDays);
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/main.scss';

  .course-canvas {
    position: relative;
    left: 20rem;
    top: 1.5rem;
    max-width: 2200px;
  }
  
  .timeline,
  .overview,
  .numbers {
    position: absolute;
    display: grid;
    margin: 0 3.5rem;
    width: 2100px;
    max-width: 2100px;
    .overview-head {
      position: absolute;
      top: 1.5rem;
      left: 2rem;
    }
  }

  .overview {
    .course-wrapper {
      margin: 0.75rem 0;
    }
  }

  .timeline {
    top: 0;
    left: 0;
    height: 100%;
    z-index: -1;
    grid-template-columns: repeat(14, 1fr);
    padding: 2rem 0 .75rem 0;
    border-bottom: 1px solid $stroke;
    text-align: center;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 2rem;
      left: -100px;
      width: 100px;
      height: 1px;
      background: $stroke;
    }
    .time-indicator {
      display: block;
      position: absolute;
      top: 0;
      left: 2rem;
      width: 1px;
      height: 100%;
      background: linear-gradient(
        to bottom,
        $stroke,
        $stroke 50%,
        $white 50%,
        $white
      );
      background-size: 100% 20px;
      z-index: 100;
    }
  }

  .number {
    width: 150px;
    z-index: 10;
    border-left: 1px solid $stroke;
    outline-offset: -10px;
    span {
      position: relative;
      top: -2rem;
      left: -50%;
    }
  }

  .numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: -24px;
    position: sticky;
    border-bottom: 1px solid $stroke;
    top: 0;
    padding: 24px 0 12px 0;
    background: #fff;
    z-index: 100;
  }

  .overview {
    padding-top: 6.5rem;
    z-index: 10;
    grid-template-columns: repeat(13 * 4, 1fr);
  }

  .overview[day="monday"] {
    margin-top: 1.5rem;
  }

  .overview{
    position: relative;
    display: inline-flex;
    flex-direction: column;
    height: auto;
    left: 0;
    right: 0;
    grid-row-gap: 1rem;
    grid-template-rows: repeat(auto-fit);
  }

  .course-loader {
    width: 60vw;
    height: 4.5rem;
    border-radius: 32px;
    margin-top: 5rem;
    margin-left: 5rem;
    background: $c-light-grey;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 5rem;
      height: 7rem;
      background: linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 1) 50%, rgba(255,255,255, 0));
      transform: translate(0, 50%);
      animation: sheen 750ms ease-in-out infinite;
    }
  }

  @keyframes sheen {
    100% {
      transform:  translate(70vw, 50%);
    }
  }
</style>
