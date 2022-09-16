<template>
  <div class="app">
    <Sidebar/>
    <Modules/>
    <MobileSidebar></MobileSidebar>
    <CourseCanvas                                 @CURRENT_COURSE_TRIGGERED="toggleCurrentCourse"/>
    <DetailsView :isActive="detailsModalIsActive" @CURRENT_COURSE_TRIGGERED="toggleCurrentCourse"/>
    <Notification></Notification>
    <VersionOverlay></VersionOverlay>
    <Authentication v-if="authentication"></Authentication>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseCanvas from '@/components/courseCanvas.vue'
import Sidebar from '@/components/sidebar.vue'
import MobileSidebar from '@/components/mobilesidebar.vue'
import Modules from '@/components/modules.vue'
import DetailsView from '@/components/details.vue'
import Notification from '@/components/notification.vue'
import Authentication from '@/components/authentication.vue'
import VersionOverlay from '@/components/versionOverlay.vue'

export default {
  name: 'home',
  components: {
    CourseCanvas,
    Sidebar,
    MobileSidebar,
    Modules,
    DetailsView,
    Notification,
    Authentication,
    VersionOverlay
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
  },
  created () {
    if(typeof this.$route.query.id != 'undefined') {
      // Authenticates User by route. E.G. (/:id)
      let passphrase = this.$route.query.id;
      // Sets the First letter to capital to ensure no DB calls will run into nothing
      passphrase = passphrase.charAt(0).toUpperCase() + passphrase.slice(1);
      
      let userData = {
        passphrase : passphrase
      }
      console.log(userData)
      this.$store.dispatch('login', userData)
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) { 
      this.$store.dispatch('getUserData', token)
    }
  }
}
</script>

<style lang="scss">
  .app {
    display: flex;
  }
</style>
