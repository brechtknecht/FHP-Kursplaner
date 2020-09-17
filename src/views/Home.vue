<template>
  <div class="app">
    <Sidebar/>
    <Modules/>
    <CourseCanvas                             @CURRENT_COURSE_TRIGGERED="toggleCurrentCourse"/>
    <Details :isActive="detailsModalIsActive" @CURRENT_COURSE_TRIGGERED="toggleCurrentCourse"/>
    <Notification></Notification>
    <Authentication v-if="authentication"></Authentication>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseCanvas from '@/components/courseCanvas.vue'
import Sidebar from '@/components/sidebar.vue'
import Modules from '@/components/modules.vue'
import Details from '@/components/details.vue'
import Notification from '@/components/notification.vue'
import Authentication from '@/components/authentication.vue'

import {
    mapState,
  } from 'vuex'

export default {
  name: 'home',
  components: {
    CourseCanvas,
    Sidebar,
    Modules,
    Details,
    Notification,
    Authentication
  },
  data () {
    return {
      detailsModalIsActive: false,
    }
  },
  computed: {
    authentication () {
      return this.$store.state.user.toggleAuth
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
