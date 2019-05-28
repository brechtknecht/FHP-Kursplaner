<template>
  <div class="app">
    <Sidebar/>
    <Modules />
    <CourseCanvas msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseCanvas from '@/components/courseCanvas.vue'
import Sidebar from '@/components/sidebar.vue'
import Modules from '@/components/modules.vue'

export default {
  name: 'home',
  components: {
    CourseCanvas,
    Sidebar,
    Modules
  }
}
</script>

<style>
  .app {
    display: flex;
  }
</style>
