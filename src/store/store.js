import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: []
  },
  actions: {
    loadCourses ({ commit }) {
      axios
        .get('http://localhost:3000/courses')
        .then(r => r.data)
        .then(courses => {
          commit('SET_COURSES', courses.data)
        })
    }
  },
  mutations: {
    SET_COURSES (state, courses) {
      state.courses = courses
    }
  }
  
})