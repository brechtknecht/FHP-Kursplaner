<template>
  <div class="home">
    
    <CourseCanvas msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseCanvas from '@/components/courseCanvas.vue'

export default {
  name: 'home',
  components: {
    CourseCanvas
  }
}
</script>
