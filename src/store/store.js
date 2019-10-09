import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jsonPath from 'jsonpath'

import modulePlan from './metadata/modulePlan'
// import viewController from './view'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queries: {
      studyType: "Grundstudium",
      examOrder: "PO 2013",
      days: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true
      },
      modules: [],
      moduleQueryStudyType: String,
      sorting: {
        //...
      }
    },
    courses: {
      days: [],
      status: {
        isEmpty: true
      }
    },
    coursesStash: [],
    currentCourse: Object,
    modulePlan: modulePlan,
    view: {
      activeDays: ['Montag'],
      detailsSelected: Boolean
    },
    user: {
      rememberedCourses: []
    },
    notification: {}
  },
  actions: {
    async loadCourses_OFFLINE ({commit}, ) {
      await axios
        .get('data/courses.json')
        .then(r => r.data)
        .then((result) => {
          commit('STASH_LOADED_COURSES', result)
        }); 
    },
    async loadCourses_2019_OFFLINE ({commit}, ) {
      await axios
        .get('data/course-data.json')
        .then(r => r.data)
        .then((result) => {
          commit('STASH_LOADED_COURSES', result)
        }); 
    },
    async loadCourses ({ commit }) {
        await axios
          .get('http://localhost:3000/courses')
          .then(r => r.data)
          .then((result) => {
            commit('STASH_LOADED_COURSES', result);
          })
    },
    SWITCH_STUDY_TYPE ({commit}, studyType) {
      commit('SWITCH_STUDY_TYPE', studyType);
      commit('QUERY_COURSES');
      commit('WIPE_MODULE_QUERY');
    }
  },
  mutations: {
    VIEW_DETAILS_SELECTED (state, toggle) {
      document.getElementsByClassName('detailsWrapper')[0].scrollTop = 0;
      state.view.detailsSelected = toggle;
    },
    STASH_LOADED_COURSES (state, courses) {
      state.coursesStash = courses;
    },
    SWITCH_STUDY_TYPE (state, payload) {
      state.queries.studyType = payload;

      // 👨‍💻 UX Change: Scroll to top
      window.scrollTo(0,0);
      this.commit('SET_ACTIVE_DAYS');
    },
    SWITCH_STUDY_ORDER (state, payload) {
      state.queries.examOrder = payload;
    },
    SET_CURRENT_COURSE (state, payload) {
      state.currentCourse = payload;
    },
    SET_ACTIVE_DAYS (state, payload) {
      let days = document.getElementsByClassName('overview');
      let displayedDays = [];
      for (var item of days) {
        if (item.classList.contains('in-viewport')) {
          displayedDays.push(item.getAttribute('day'));
        }
      }
      state.view.activeDays = displayedDays;
    },
    SET_MODULE_QUERY (state, payload) {
      let query = state.queries.modules;
      for (let i = 0; i < query.length; i++) {
        if(query[i] == payload) {
           state.queries.modules.splice(i, 1);
           return;
        }
      }
      this.commit('QUERY_COURSES');
      state.queries.modules.push(payload);
    },
    WIPE_MODULE_QUERY (state) {
        state.queries.modules = [];
        this.commit('QUERY_COURSES');
        this.commit('WIPE_NOTIFICATION');
    },
    USER_ADD_REMEMBERED_COURSE (state, id) {
      // Check if course already exist and delete it
      let rememberedCoursesRef = state.user.rememberedCourses;
      
      if(rememberedCoursesRef.includes(id)){
        rememberedCoursesRef.splice(rememberedCoursesRef.indexOf(id), 1);
        return;
      }

      // Add course reference to list
      rememberedCoursesRef.push(id);
    },
    QUERY_COURSES (state) {
      let courses = [];
      let queries = state.queries;
      let result = state.coursesStash;

      // Throw error, because the courseStash is not loaded yet

      if(queries.studyType == 'selectedCourses') {
        // Iterate over states
        state.user.rememberedCourses.forEach(function (courseID) {
          let query = '$..courses[?(@._id == "' + courseID + '")]';
          courses.push(jsonPath.query(result, query)[0]);
        }); 

      }

      if(queries.studyType == 'Grundstudium'){
        courses = jsonPath.query(result, '$..courses[?(@.attributes.module.name.startsWith("1"))]');
      } else if (queries.studyType == 'Hauptstudium'){
        courses = jsonPath.query(result, '$..courses[?(@.attributes.module.name.startsWith("2"))]');
      } else if (queries.studyType == 'Master') {
        courses = jsonPath.query(result, '$..courses[?(@.attributes.module.name.startsWith("3"))]');
      } 


      console.log('Kurse', courses);

      // Filter all courses based on the given module group attributes & if empty just pass all
      let queriedCourses = [];
      if (!state.queries.modules.length == 0) {
        for (let moduleQuery of state.queries.modules) {
          if(state.queries.examOrder == 'PO 2013') {
            queriedCourses.push(jsonPath.query(courses, "$[?(@.attributes.module.id == '" + moduleQuery + "')]"));  
            console.log('Modulsuche 2013');
          } else if (state.queries.examOrder == 'PO 2019'){
            let query = moduleQuery.replace('PO 2019 ', '');
            console.log("moduleQuery", query);
            queriedCourses.push(jsonPath.query(courses, "$[?(@.attributes.module.id_new == '" + query + "')]"));
          }
        }

        let coursesStash = [];
        console.log('Modulbasierte Suche: ', queriedCourses);
        
        for(let i = 0; i < queriedCourses.length; i++) {
            for(let k = 0; k < queriedCourses[i].length; k++){
              coursesStash.push(queriedCourses[i][k]);
            }
        }
        
        
        courses = coursesStash;
      }
      
      

      
      // 2. Select all weekdays you need from the specification
      let monday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 1)]");
      let tuesday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 2)]");
      let wednesday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 3)]");
      let thursday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 4)]");
      let friday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 5)]");


      // 3. Sort all courses by daytime
      monday = sortProperties(monday);
      tuesday = sortProperties(tuesday);
      wednesday = sortProperties(wednesday);
      thursday = sortProperties(thursday);
      friday = sortProperties(friday);

      // Check if everything is empty
      let isEmpty;
      if(!monday.length && !tuesday.length && !wednesday.length && !thursday.length && !friday.length) {
        isEmpty = true;
      } else {
        isEmpty = false;
      }

      let _mondayEmpty;
      let _tuesdayEmpty;
      let _wednesdayEmpty;
      let _thursdayEmpty;
      let _fridayEmpty;

      (!monday.length) ? (_mondayEmpty = true) : (_mondayEmpty = false);
      (!tuesday.length) ? (_tuesdayEmpty = true) : (_tuesdayEmpty = false);
      (!wednesday.length) ? (_wednesdayEmpty = true) : (_wednesdayEmpty = false);
      (!thursday.length) ? (_thursdayEmpty = true) : (_thursdayEmpty = false);
      (!friday.length) ? (_fridayEmpty = true) : (_fridayEmpty = false);

      courses = {
        status: {
          ready: true,
          isEmpty: isEmpty
        },
        days: [
          {
            string: "Montag",
            data: monday,
            key: "monday",
            isEmpty: _mondayEmpty
          }, {
            string: "Dienstag",
            data: tuesday,
            key: "tuesday",
            isEmpty: _tuesdayEmpty
          },{
            string: "Mittwoch",
            data: wednesday,
            key: "wednesday",
            isEmpty: _wednesdayEmpty
          },{
            string: "Donnerstag",
            data: thursday,
            key: "thursday",
            isEmpty: _thursdayEmpty
          }, {
            string: "Freitag",
            data: friday,
            key: "friday",
            isEmpty: _fridayEmpty
          }
        ]
      }

      // Parse Color Coding into the courses
      courses.days.forEach(function(day) {
        day.data.forEach(function(course, i) {
          let result = getObjects(state.modulePlan, 'id', course.attributes.module.id);

          if(typeof(result[0]) == 'undefined'){
            return;
          }

          if (result[0].hasOwnProperty('colorCode')) {
              let colorCode = result[0].colorCode;
              day.data[i].attributes.colorCode = colorCode;
          }

          if (result[0].hasOwnProperty('colorCode')) {
            let subtitle = result[0].subtitle;
            day.data[i].attributes.subtitle = subtitle;
          }
          
        });
      });

      state.courses = courses;
    },
    PUSH_NOTIFICATION (state, payload) {
      state.notification = {
        message: payload.message,
        action: payload.action,
      };
    },
    WIPE_NOTIFICATION (state) {
      state.notification = {};
    }
  }
  
})


// Vuex helper functions

function sortProperties(obj) {	
  // sort items by value
	obj.sort(function(a, b) {
	  return a.attributes.time.fixture.begin.hour.value - b.attributes.time.fixture.begin.hour.value; // compare numbers
  });
  
	return obj; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getObjects(obj[i], key, val));    
      } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
          objects.push(obj);
      } else if (obj[i] == val && key == ''){
          //only add if the object is not already in the array
          if (objects.lastIndexOf(obj) == -1){
              objects.push(obj);
          }
      }
  }
  return objects;
}