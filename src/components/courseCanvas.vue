<template>
  <div class="course-canvas">
    <div class="timeline">
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
    <div class="overview" day="monday">
      <div class="overview-head"> 
        <h1 class="regular">Montag</h1>
      </div>
      <div class="course-wrapper" v-for="(course, index) in courses" :key="course.id" >
        <course
          :position="{ 
            row: index,
            start:    course.attributes.time.fixture.begin,
            end:      course.attributes.time.fixture.end,
          }" 
          :info="{
            title:    course.attributes.title,
            teacher:  course.attributes.teacher,
            module: {
              id:     course.attributes.module.id,
              name:   course.attributes.module.category,
              category: ''
            }
          }"
          ></course>
        </div>
      </div>
    </div>
</template>

<script>
  import Course from '@/components/course.vue';

  import { mapState } from 'vuex'

  export default {
    components : {
      Course
    },
    created () {
      this.$store.dispatch('queryCourses')
    },
    computed: mapState([
      'courses'
    ])
  }
</script>

<style lang="scss">
  @import '@/assets/scss/main.scss';

  .course-canvas {
    position: relative;
    left: 20rem;
    top: 1.5rem;
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
  }

  .number {
    width: 150px;
    z-index: 10;
    border-top: 1px solid $stroke;
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
  }

  .overview {
    z-index: 10;
    grid-template-columns: repeat(13 * 4, 1fr);
  }

  .overview[day="monday"] {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    height: auto;
    left: 0;
    right: 0;
    padding-top: 5.5rem;
    grid-row-gap: 1rem;
    grid-template-rows: repeat(auto-fit);
  }
</style>
