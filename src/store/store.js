import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jsonPath from 'jsonpath'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: []
  },
  actions: {
    async loadCourses ({ commit }) {
      await axios
        .get('http://localhost:3000/courses')
        .then(r => r.data)
        .then(courses => {
          commit('SET_COURSES', courses.data)
        })
    },
    async queryCourses ({commit}) {
        await axios
          .get('http://localhost:3000/courses')
          .then(r => r.data)
          .then((result) => {
            //DEBUGGING Query Variable
            let queries = {
              studytype: 'Hauptstudium'
            }

            // let grundstudiumRegex = "/^[1][0-9].*$/"
            // let hauptstudiumRegex = new RegExp("\\^[2][0-9].*$");
            
            //Initialize Course Object, wich will be returned
            let courses;

            // 1. Get all courses for the correct study section
            if(queries.studytype == 'Grundstudium'){
              courses = jsonPath.query(result, '$..courses[?(@.attributes.module.id.startsWith("1"))]');
            } else if (queries.studytype == 'Hauptstudium'){
              courses = jsonPath.query(result, '$..courses[?(@.attributes.module.id.startsWith("2"))]');
            }

            // 2. Select all weekdays you need from the specification
            let monday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 1)]");
            let tuesday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 2)]");
            let wednesday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 3)]");
            let thursday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 4)]");
            let friday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 5)]");

            
            return tuesday;
          })
          .then(courses => {
            commit('SET_COURSES', courses);
          })
          
    } 
  },
  mutations: {
    SET_COURSES (state, courses) {
      state.courses = courses
    }
  }
  
})