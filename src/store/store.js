import Vuex from 'vuex'
import axios from 'axios'
// import jsonPath from 'jsonpath'
var jsonPath = require('jsonpath');

import modulePlan from './metadata/modulePlan'
// import viewController from './view'

const developAPI = 'http://fb4kursplaner.fh-potsdam.de/api'
// const productionAPI = 'http://döner.jetzt:5000/api'
// const productionAPI = 'https://fhp-kursplaner-authenticator.herokuapp.com/api'
const productionAPI = 'http://fb4kursplaner.fh-potsdam.de/api'

const authAPI = process.env.NODE_ENV == 'production' ? productionAPI : developAPI


export default new Vuex.Store({
  state: {
    user: {
      status: localStorage.getItem('token') ? 'success' : '',
      token: localStorage.getItem('token') || '',
      generatedPassphrase: '',
      rememberedCourses: [],
      toggleAuth: false,
      toggleUserProfile: false,
      error: false,
      isFirstPageVisit: true
    },
    queries: {
      studyType: "Grundstudium",
      examOrder: "PO 2019",
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
      detailsSelected: Boolean,
      navbar: Boolean
    },
    notification: {}
  },
  actions: {
    // USER AUTHENTICATION
    login ({commit}, userData){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        userData.passphrase = userData.passphrase.charAt(0).toUpperCase() + userData.passphrase.slice(1);
        axios({url: authAPI + '/login', headers: {'Passphrase': userData.passphrase}, data: userData, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp
          // const passphrase =  JSON.parse(resp.config.data).passphrase;
          
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          this.dispatch('getUserData')
          commit('auth_success', {
            token: token,
            user: user,
            passphrase: resp.config
          })
          resolve(resp)
        })
        .catch(err => {
          // Redirect to Homepage
          console.log("Login Error")
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        console.log("Logout")
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    signIn({commit}, passphrase){
      return new Promise((resolve, reject) => {
        console.log(passphrase)
        commit('auth_request')
        axios({url: authAPI + '/signIn', headers: {'Passphrase': passphrase}, data: passphrase, method: 'POST' })
        .then(resp => {
          console.log(resp)
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', {
            token: token,
            user: user,
            passphrase: resp.config
          })
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getUserData({commit, state}) {
      return new Promise((reject) => {
        commit('auth_request')
        const token = localStorage.getItem('token')
        if(!token) {
          console.log("No token found at localstorage, escape")
          return;
        }
        axios({url: authAPI + '/getUserData', headers: {'Authorization': 'Bearer ' + token}, method: 'POST' })
        .then(resp => { 
          console.log("Recieved UserData")
          console.log(resp);
          console.log("Recieved Data in with: »" + resp.data.authData.user.passphrase + '«');
          state.user.name = resp.data.authData.user.passphrase;
          // commit('auth_success', token, resp.data.authData.user.passphrase)
          commit('setUserDataToStore', resp.data.userData)
        })
        .catch(err => {
          console.log("Login Error")
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    updateUserData({getters}) {
      return new Promise(() => {
        const token = localStorage.getItem('token')
        if(!token) {
          console.log("No token found at localstorage, escape")
          return;
        }

        const rememberedCourses = getters.getRememberedCoursesData()

        axios({url: authAPI + '/updateUserData', data: { rememberedCourses: rememberedCourses}, headers: {'Authorization' : 'Bearer ' + token}, method: 'POST'})
          .then(resp => {
            console.log('Updated Data Successfully: ', resp)
          })
          .catch(err => {
            console.log("Updating Data failed: ", err)
          })
      }) 
    },
    generatePassphrase({commit}){
      return new Promise(() => {
        axios({url: authAPI + '/generate', method: 'GET'})
          .then(resp => {
            commit('auth_generate', resp.data)
          })
          .catch(err => {
            console.log("Generate Error ", err)
            return
          })
      })
    },

    

    // COURSE LOGIC
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
    async loadCourses_INCOM ({commit}, ) {
      await axios
        .get('data/vlv-incom.24.09.22.json')
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
      if(studyType == 'selectedCourses') {
        commit('CHECK_AUTH');
      }
      commit('QUERY_COURSES');
      commit('WIPE_MODULE_QUERY');
    }
  },
  mutations: {
    // CHECK FOR FIRST PAGE VISIT
    IS_FIRST_PAGE_VISIT (state) {
      let pageVisited = localStorage.getItem('pageVisited')
      if(pageVisited) {
        state.user.isFirstPageVisit = false
      } else {
        state.user.isFirstPageVisit = true
        localStorage.setItem('pageVisited', true)
      }
      
    },

    // AUTH LOGIC
    CHECK_AUTH(state) {
      if(state.user.status == '') {
        console.log("Toggle Authentication")
        state.user.toggleAuth = true
      }
    },

    auth_request(state){
      state.user.status = 'loading'
    },
    auth_success(state, userData){
      state.user.status = 'success'
      state.user.token = userData.token
      state.user.error = false

      const passphraseIsJSON = stringIsJSON(userData.passphrase.data)
      console.log("PassphraseJSON " + passphraseIsJSON)

      if(passphraseIsJSON) {
        state.user.name = JSON.parse(userData.passphrase.data).passphrase
      } else {
        state.user.name = userData.passphrase.data
      }

      // console.log(JSON.parse(userData.passphrase.data).passphrase)
      state.user.toggleAuth = false;
      console.log("Auth Success — User: " + userData.user)
      // state.user = user
    },
    auth_error(state){
      state.user.status = 'error'
      state.user.error = true;
      this.$router.push("/")
    },
    auth_generate(state, payload) {
      state.user.generatedPassphrase = payload.passphrase;
    },
    logout(state){
      state.user.status = ''
      state.user.token = ''
      state.user.rememberedCourses = []
      state.user.toggleUserProfile = false
    },

    setUserDataToStore(state, payload) {
      state.user.rememberedCourses = payload.data.rememberedCourses;
      this.commit('QUERY_COURSES')
    },

    // RESPONSIVE LOGIC
    DISABLE_NAVBAR (state) {
      state.view.navbar = false
    },

    ENABLE_NAVBAR (state) {
      state.view.navbar = true
    },

    // MODULE LOGIC
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
    SET_ACTIVE_DAYS (state) {
      let days = document.getElementsByClassName('overview');
      let displayedDays = [];
      for (var item of days) {
        if (item.children[0]?.children[0].classList.contains('in-viewport')) {
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
      // DANGER UNCOMMENT IF STUFF BREAKS
      // this.commit('QUERY_COURSES');
      state.queries.modules.push(payload);
    },
    WIPE_MODULE_QUERY (state) {
        state.queries.modules = [];
        this.commit('QUERY_COURSES');
        this.commit('WIPE_NOTIFICATION');
    },
    USER_ADD_REMEMBERED_COURSE (state, id) {
      this.commit('CHECK_AUTH');
      console.log(localStorage.getItem('token'))
      // Check if course already exist and delete it
      let rememberedCoursesRef = state.user.rememberedCourses;
      
      if(rememberedCoursesRef.includes(id)){
        rememberedCoursesRef.splice(rememberedCoursesRef.indexOf(id), 1);
        this.dispatch('updateUserData')
        return;
      }

      // Add course reference to list
      rememberedCoursesRef.push(id);

      // Updates Userdata to the Database
      this.dispatch('updateUserData')
    },
    QUERY_COURSES (state) {
      let courses = [];
      let queries = state.queries;
      let result = state.coursesStash;


      if(queries.studyType == 'selectedCourses') {
        // Iterate over states
        let selectedCourses = []
        state.user.rememberedCourses.forEach(function (courseID) {
          let query = '$..courses[?(@.id == ' + courseID + ')]';
          selectedCourses.push(jsonPath.query(result, query)[0]) 
        });
        console.log("Selected Courses: ", selectedCourses)
        courses.courses = selectedCourses; 
      }

      
      if(queries.studyType == 'Grundstudium'){
        courses = result.segments[0]
      } else if (queries.studyType == 'Hauptstudium'){
        courses = result.segments[1]
      } else if (queries.studyType == 'Master') {
        courses = result.segments[2]
      } 


      // Filter all courses based on the given module group attributes & if empty just pass all
      let queriedCourses = [];
      if (!state.queries.modules.length == 0) {
        for (let moduleQuery of state.queries.modules) {
          if (state.queries.examOrder == 'PO 2019'){
            let query = moduleQuery.replace('PO 2019 ', '');
            queriedCourses.push(jsonPath.query(courses, "$..courses[?(@.module.simplifiedNr == '" + query + "')]"));
          }
        }

        let coursesStash = [];
        
        for(let i = 0; i < queriedCourses.length; i++) {
          for(let k = 0; k < queriedCourses[i].length; k++){
            coursesStash.push(queriedCourses[i][k]);
          }
        }        
        console.log('Modulbasierte Suche: ', coursesStash);
        
        courses = {courses : coursesStash};
      }



      
      console.log('Kurse', courses);      

      let monday = []
      let tuesday = []
      let wednesday = []
      let thursday = []
      let friday = []
      let undefinedDate = []
      
      
      courses.courses.forEach((course) => {
        if(course.fixture?.weekday == 1) {
          monday.push(course)
        }

        if(course.fixture?.weekday == 2) {
          tuesday.push(course)
        }

        if(course.fixture?.weekday == 3) {
          wednesday.push(course)
        }

        if(course.fixture?.weekday == 4) {
          thursday.push(course)
        }

        if(course.fixture?.weekday == 5) {
          friday.push(course)
        }

        if(typeof course.fixture === 'undefined' || course.hasUndefinedDate) {
          course.hasUndefinedDate = true
          course.fixture = {
            begin : {
              hour: 9,
              minutes: 0
            }, 
            end : {
              hour: 14,
              minutes: 0
            }
          }
      
          undefinedDate.push(course)
        }
      })


      // 3. Sort all courses by daytime
      monday = sortProperties(monday);
      tuesday = sortProperties(tuesday);
      wednesday = sortProperties(wednesday);
      thursday = sortProperties(thursday);
      friday = sortProperties(friday);
      undefinedDate = sortProperties(undefinedDate)

      // Check if everything is empty
      let isEmpty;
      if(!monday.length && !tuesday.length && !wednesday.length && !thursday.length && !friday.length && !undefinedDate.length) {
        isEmpty = true;
      } else {
        isEmpty = false;
      }

      let _mondayEmpty;
      let _tuesdayEmpty;
      let _wednesdayEmpty;
      let _thursdayEmpty;
      let _fridayEmpty;
      let _undefinedDateEmpty;

      (!monday.length) ? (_mondayEmpty = true) : (_mondayEmpty = false);
      (!tuesday.length) ? (_tuesdayEmpty = true) : (_tuesdayEmpty = false);
      (!wednesday.length) ? (_wednesdayEmpty = true) : (_wednesdayEmpty = false);
      (!thursday.length) ? (_thursdayEmpty = true) : (_thursdayEmpty = false);
      (!friday.length) ? (_fridayEmpty = true) : (_fridayEmpty = false);
      (!undefinedDate.length) ? (_undefinedDateEmpty = true) : (_undefinedDateEmpty = false);

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
          }, {
            string: "noDate",
            data: undefinedDate,
            key: "undefinedDatenoDate",
            isEmpty: _undefinedDateEmpty
          }
        ]
      }

      console.log("Weekday Courses sorted", courses)

      // Parse Simplified Course IDs in the data
      courses.days.forEach(function(day) {
        day.data.forEach(function(course, i) {
          const str = course.module.nr
          const simplifiedCourseID = str.split("-").slice(0, 2).join('-')

          course.module.simplifiedNr = simplifiedCourseID
        })
      })

      // Parse Color Coding and titles into the courses
      courses.days.forEach(function(day) {
        day.data.forEach(function(course, i) {
          let result = getObjects(state.modulePlan, 'id', course.module.simplifiedNr);

          if(typeof(result[0]) == 'undefined'){
            return;   
          }

          if (result[0].hasOwnProperty('colorCode')) {
              let colorCode = result[0].colorCode;
              day.data[i].colorCode = colorCode;
          }

          if (result[0].hasOwnProperty('colorCode')) {
            let subtitle = result[0].subtitle;
            day.data[i].subtitle = subtitle;
          }

          if (result[0].hasOwnProperty('colorCode')) {
            let category = result[0].category;
            day.data[i].category = category;
          }
        });
      });

      

      console.log("Parsed Courses: ", courses)

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
  },
  getters: {
    getRememberedCoursesData: state => () => {
        return state.user.rememberedCourses;
    }
}
  
})


// Vuex helper functions

function sortProperties(obj) {	
  // sort items by value
	obj.sort(function(a, b) {
	  return a.fixture?.begin.hour - b.fixture?.end.hour; // compare numbers
  });
  
	return obj; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function stringIsJSON(item) {
  item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

  try {
      item = JSON.parse(item);
  } catch (e) {
      return false;
  }

  if (typeof item === "object" && item !== null) {
      return true;
  }

  return false;
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