<template>
  <div class="app">
    <Sidebar/>
    <Modules/>
    <CourseCanvas @CURRENT_COURSE_TRIGGERED="toggleCurrentCourse"/>
    <Details :isActive="detailsModalIsActive" @CURRENT_COURSE_TRIGGERED="toggleCurrentCourse"/>
    <Notification></Notification>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseCanvas from '@/components/courseCanvas.vue'
import Sidebar from '@/components/sidebar.vue'
import Modules from '@/components/modules.vue'
import Details from '@/components/details.vue'
import Notification from '@/components/notification.vue'

export default {
  name: 'home',
  components: {
    CourseCanvas,
    Sidebar,
    Modules,
    Details,
    Notification
  },
  data () {
    return {
      detailsModalIsActive: false
    }
  },
  methods: {
    toggleCurrentCourse: function () {
      this.detailsModalIsActive = !this.detailsModalIsActive;
    }
  }
}
</script>

<style>
  .app {
    display: flex;
  }
</style>
