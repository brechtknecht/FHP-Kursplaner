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
      <div class="overview-head"> Montag </div>
      <course :position="{row:1, start: 3, end: 10}"></course>
    </div>
  </div>
</template>

<script>
  import Course from '@/components/course.vue';

  export default {
    components : {
      Course
    }
  }
</script>

<style lang="scss">
  .timeline,
  .overview {
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    width: 100%;
  }

  .overview[day="monday"] {
    display: grid;
    height: 100%;
    padding-top: 2rem;
    grid-template-rows: repeat(13, 6rem);
  }

  .timeline {
    padding: 2rem 0 .75rem 0;
    border: 1px solid red;
    text-align: center;
  }
</style>
