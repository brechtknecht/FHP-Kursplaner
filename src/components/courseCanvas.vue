<template>
  <div class="course-canvas">
    <div class="timeline desktop">
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
    <div class="numbers desktop">
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
    <!-- Wenn keine Daten da sind -->
    <div v-if="courses.status.isEmpty" class="empty">
      <div class="course-loader"></div>
    </div>


    <div v-if="!courses.status.isEmpty" class="courses" :class="{ collapsed: isCollapsed }">
      <div :class="'overview ' + courses.string" :day=courses.string v-for="(courses) in courses.days" :key="courses.key" ref="target">
        <div v-if="courses.data.length" class="overview-head" :class="{ loggedOut: isLoggedOut }">
            <overview-head>{{ courses.string }}</overview-head>
        </div>
        
        <div class="course-wrapper" v-for="(course, index) in courses.data" :key="course.id">
          <course :tabindex="index" :id="course.id" :position="{ 
            row: index,
            start:    course.fixture.begin,
            end:      course.fixture.end,
          }" :info="{
            id:      course.id,
            title:    course.title, 
            teacher:  course.teachers,
            module: {
              id:     course.module.nr,
              id_new: course.module.nr,
              name:   course.module.title,
              // category: course.attributes.module.category,
              category: 'NEEDS TO CHANGE',
            },
            description: course.description,
            time: 'deprecated',
            room: course.room,
            credits: course.module.credits,
            colorCode: course.colorCode,
            subtitle: course.subtitle,
            workspace: course.url
          }" @CURRENT_COURSE_TRIGGERED="passTrigger"></course>
        </div>
        </div>
      </div>
  </div>
</template>


<script>
  import Course from '@/components/course.vue';
  import OverviewHead from '@/components/base/overviewHead.vue'

  import {
    mapState
  } from 'vuex'

  export default {
    components: {
      Course,
      OverviewHead
    },
    created() {
      window.addEventListener('scroll', () => {
        this.scrollListener();
      });

      this.$store.dispatch('loadCourses_INCOM', this.queries).then(() => {
        this.$store.commit('QUERY_COURSES');
      });

      // this.$store.dispatch('loadCourses_OFFLINE', this.queries).then(() => {
      //   this.$store.commit('QUERY_COURSES');
      // });
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.scrollListener);
    },
    computed: {
      currentTimePosition: function () {
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
      isCollapsed () {
        return this.$store.state.view.navbar
      },
      isLoggedOut () {
        return this.$store.state.user.status == ''
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
      scrollListener: function () {
        let overviewHeader = document.getElementsByClassName('overview-head');
        for(let element of overviewHeader) {
          element.style.left = '19rem';
        }
        this.$store.commit('SET_ACTIVE_DAYS');
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/main.scss';

  .mobile {
    display: none;
    @include for-tablet-portrait-up () {
      display: block !important;
    }
  }

  .desktop {
    display: block;
    @include for-tablet-portrait-up () {
      display: none !important;
    }
  }

  .overview {
    @include for-tablet-portrait-up () {
      width: 100% !important;
      margin: 0 0.5rem !important;
    }
  }

  .spacer {
    height: 9rem;
    width: 100%;
    background: red;
  }

  .header {
    position: fixed;
    text-align: left;
    padding: 0 1rem;
    z-index: 100;
    width: 100%;
    transition: 250ms ease-out;
    border-bottom: 1px solid #DADCE0;
    background: #fff;
  }

  .course-canvas {
    position: relative;
    left: 20rem;
    top: 1.5rem;
    max-width: calc(100vw - 30rem);
    @include for-tablet-portrait-up {
        max-width: 100vw;
        max-height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
        left: 0;
        top: 0;
    }
  }

  .courses {
    max-width: 100rem;
    position: relative;
    top: 0;
    @include for-tablet-portrait-up {
      &.collapsed {
        .overview-head.loggedOut {
          top: 0 !important;
        }
        .overview-head {
          top: 0 !important;
        }
      }
    }
    
  }

  

  .timeline,
  .overview,
  .numbers {
    position: absolute;
    display: grid;
    margin-left: 3rem;
    width: 2116px;
    max-width: 2116px;
    height: 28px;

    span {
      margin-left: 1rem;
    }


    .overview-head {
      position: sticky;
      top: 64.5px !important;
      width: calc(100vw - 20rem);
      padding: 1rem .75rem .75rem .75rem;
      margin-left: -3.85rem;
      will-change: margin-left;
      max-width: calc(2116px - 24px) !important;
      // padding-left: 3.85rem;
      border-radius: 1rem;
      z-index: 300;
      text-align: left;
      color: $c-font;
      top: 1.5rem;
      transition: 250ms ease-out;
      @include for-tablet-portrait-up {
        left: 0 !important;
        top: 7.3rem !important;
        &.loggedOut {
          top: 5.9rem !important;
        }
      }
      h1 {
        font-weight: normal;
        margin: 0;
      }
      .left-fix {
        position: relative;
      }
      &::before {
        content: '';
        position: absolute;
        left: -1rem;
        top: -.05rem;
        width: 100%;
        height: 100%;
        z-index: -1;
        border-bottom: 1px solid $stroke;
        border-right: 1px solid $stroke;
        border-top: 1px solid $stroke;
        background: rgba(255, 255, 255, .95);
      }
      @include for-tablet-portrait-up {
        &::before  {
          left: 0rem;
        }
      }
    }
  }

  .overview {
    .course-wrapper {
      &:focus {
        outline: 0;
      }
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
      top: 3.55rem;
      left: -100px;
      width: 100px;
      height: 1px;
      z-index: 1000;
      background: $stroke;
    }

    .time-indicator {
      display: block;
      position: absolute;
      top: 0;
      left: 2rem;
      width: 1px;
      height: 100%;
      background: linear-gradient(to bottom,
          $stroke,
          $stroke 50%,
          $white 50%,
          $white);
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
    margin-left: -2rem;
    position: sticky;
    border-bottom: 1px solid $stroke;
    top: 0;
    padding: 24px 0 12px 0;
    background: #fff;
    z-index: 70;
    span {
      font-feature-settings: "tnum";
    }
  }

  .overview {
    z-index: 10;
    grid-template-columns: repeat(13 * 4, 1fr);
    .course-wrapper:first-child {
      border: 2px solid red;
    }
    .course-wrapper:last-child {
      margin-bottom: 2rem;
    }
  }

  .overview[day="monday"] {
    margin-top: 1.5rem;
  }

  .overview {
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
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0));
      transform: translate(0, 50%);
      animation: sheen 750ms ease-in-out infinite;
    }
  }

  @keyframes sheen {
    100% {
      transform: translate(70vw, 50%);
    }
  }
</style>