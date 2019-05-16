<template>
  <div class="app">
    <Sidebar/>
    <CourseCanvas msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseCanvas from '@/components/courseCanvas.vue'
import Sidebar from '@/components/sidebar.vue'

export default {
  name: 'home',
  components: {
    CourseCanvas,
    Sidebar
  }
}
</script>

<style>
  .app {
    display: flex;
  }
</style>
