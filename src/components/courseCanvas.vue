<template>
  <div class="course-canvas">
    <div class="timeline">
      <span class="number">09:00</span>
      <span class="number">10:00</span>
      <span class="number">11:00</span>
      <span class="number">12:00</span>
      <span class="number">13:00</span>
      <span class="number">14:00</span>
      <span class="number">15:00</span>
      <span class="number">16:00</span>
      <span class="number">17:00</span>
      <span class="number">18:00</span>
      <span class="number">19:00</span>
      <span class="number">20:00</span>
      <span class="number">21:00</span>
    </div>
    <div class="overview" day="monday">
      <div class="overview-head"> 
        <h1 class="regular">Montag</h1>
      </div>
        <course
          v-for="(course, index) in courses.data.semester.courses" 
          :key="course.id"
          :position="{ 
            row: index,
            start:    9,
            end:      20,
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
    mounted () {
      this.$store.dispatch('loadCourses')
    },
    computed: mapState([
      'courses'
    ])
  }
</script>

<style lang="scss">
  @import '@/assets/scss/main.scss';

  .timeline,
  .overview {
    display: grid;
    position: relative;
    width: 100%;
    .overview-head {
      position: absolute;
      top: 1.5rem;
      left: 2rem;
    }
  }

  .timeline {
    grid-template-columns: repeat(13, 1fr);
  }

  .overview {
    grid-template-columns: repeat(13 * 4, 1fr);
  }

  .overview[day="monday"] {
    display: grid;
    height: 100%;
    padding-top: 5.5rem;
    grid-row-gap: 1rem;
    grid-template-rows: repeat(auto-fit);
  }

  .timeline {
    padding: 2rem 0 .75rem 0;
    border-bottom: 1px solid $stroke;
    text-align: center;
  }
</style>
