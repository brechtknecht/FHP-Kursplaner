import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jsonPath from 'jsonpath'
import { cpus, setPriority } from 'os';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queries: {
      studyType: "Grundstudium",
      days: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true
      },
      modules: [],
      sorting: {
        //...
      }
    },
    courses: [],
    coursesStash: [],
    currentCourse: Object,
    modulePlan: {
      basicStudyPeriod: {
        elementares_gestalten: {
          title: "I/1 Gestaltungsgrundlagen",
          elementares_gestalten: {
            title: "Elementares Gestalten",
            modules: [{
              id: "11EG-B",
              title: "Basics",
              colorCode: "#E7E8E9"
            },{
              id: "11EG-K",
              title: "Kontext",
              colorCode: "#E7E8E9"
            },{
              id: "11EG-P",
              title: "Prozess",
              colorCode: "#E7E8E9"
            }]
          },
          atelier: {
            title: "Atelier",
            modules: [{
              id: "11At-Z",
              title: "Atelier",
              colorCode: "#E7E8E9"
            },{
              id: "11At-F",
              title: "Atelier",
              colorCode: "#E7E8E9"
            }]
          }
          
        },
        entwurfsgrundlagen: {
          title: "I/2 Entwurfsgrundlagen",
          interfacedesign: {
            title: "Interfacedesign",
            modules: [{
              id: "12EId-MK",
              title: "Mensch + Kontext",
              colorCode: "#D8F0F4"
            }, {
              id: "12FOId-VI",
              title: "wurst",
              colorCode: "#D8F0F4"
            }, {
              id: "12FOId-XD",
              title: "wurst",
              colorCode: "#D8F0F4"
            }]
          },
          kommunikationsdesign: {
            title: "Kommunikationsdesign",
            modules: [{
              id: "12FOKd-IL",
              title: "Schrift + Ausdruck",
              colorCode: "#EDF3DA"
            }, {
              id: "12FOKd-TD",
              title: "Wurst",
              colorCode: "#EDF3DA"
            }, {
              id: "12FOKd-AD",
              title: "Wurst",
              colorCode: "#EDF3DA"
            }, {
              id: "12FOKd-FG",
              title: "Wurst",
              colorCode: "#EDF3DA"
            }, {
              id: "12FOKd-MG",
              title: "Wurst",
              colorCode: "#EDF3DA"
            }, {
              id: "12FOKd-TY",
              title: "Wurst",
              colorCode: "#EDF3DA"
            }, {
              id: "12FOKd-CD",
              title: "Wurst",
              colorCode: "#EDF3DA"
            }]
          },
          produktdesign: {
            title: "Produktdesign",
            modules: [{
              id: "12EPd-ST",
              title: "Material + Technik",
              colorCode: "#CFE4BC"
            }, {
              id: "12FOPd-ID",
              title: "Wurst",
              colorCode: "#CFE4BC"
            }, {
              id: "12FOPd-PU",
              title: "Wurst",
              colorCode: "#CFE4BC"
            }, {
              id: "12FOPd-DP",
              title: "Wurst",
              colorCode: "#CFE4BC"
            }, {
              id: "12FOPd-PD",
              title: "Wurst",
              colorCode: "#CFE4BC"
            }, {
              id: "12FOId-PI",
              title: "Wurst",
              colorCode: "#CFE4BC"
            }]
          }
        },
        theorie: {
          title: "I/3 Theorie",
          modules: [{
            id: "13Th-DT",
            title: "Design-/Medien-theorie",
            colorCode: "#E7E8E9"
          },{
            id: "13Th-DG",
            title: "Design-/Kultur-geschichte",
            colorCode: "#E7E8E9"
          },{
            id: "13Th-DM",
            title: "Designmanagement und -recht",
            colorCode: "#E7E8E9"
          }]
        },
        werkstatt: {
          title: 'Werkstatt',
          modules: [{
            id: "14W4D-IL",
            title: "Interface Labor",
            colorCode: "#F87060"
          }, {
            id: "14W3D-TV",
            title: "Wurst",
            colorCode: "#F87060"
          }, {
            id: "14W2D-D",
            title: "Wurst",
            colorCode: "#F87060"
          }, {
            id: "14W2D-DP",
            title: "Wurst",
            colorCode: "#F87060"
          }, {
            id: "14W2D-WV",
            title: "Wurst",
            colorCode: "#F87060"
          }, {
            id: "14W3D-MW",
            title: "Wurst",
            colorCode: "#F87060"
          }, {
            id: "14W4D-AVtest",
            title: "Wurst",
            colorCode: "#F87060"
          }]
        },
        projekte: {
          title: 'Projektarbeiten',
          modules: [{
            id: "15PP-KF",
            title: "Wurst",
            colorCode: "#91C4F2"
          }]
        }
      }
    }
  },
  actions: {
    async loadCourses_OFFLINE ({commit}, ) {
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
    }
  },
  mutations: {
    STASH_LOADED_COURSES (state, courses) {
      state.coursesStash = courses;
    },
    SWITCH_STUDY_TYPE (state, payload) {
      state.queries.studyType = payload;
    },
    SET_CURRENT_COURSE (state, payload) {
      state.currentCourse = payload;
    },
    QUERY_COURSES (state) {
      let courses;
      let queries = state.queries;
      let result = state.coursesStash;

      // Throw error, because the courseStash is not loaded yet

      if(queries.studyType == 'Grundstudium'){
        courses = jsonPath.query(result, '$..courses[?(@.attributes.module.id.startsWith("1"))]');
      } else if (queries.studyType == 'Hauptstudium'){
        courses = jsonPath.query(result, '$..courses[?(@.attributes.module.id.startsWith("2"))]');
      } else if (queries.studyType == 'Master') {
        courses = jsonPath.query(result, '$..courses[?(@.attributes.module.id.startsWith("3"))]');
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

      courses = {
        status: {
          ready: true
        },
        days: [
          {
            string: "Montag",
            data: monday,
            key: "monday"
          }, {
            string: "Dienstag",
            data: tuesday,
            key: "tuesday",
          },{
            string: "Mittwoch",
            data: wednesday,
            key: "wednesday"
          },{
            string: "Donnerstag",
            data: thursday,
            key: "thursday"
          }, {
            string: "Freitag",
            data: friday,
            key: "friday"
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
        });
      });

      

      

      state.courses = courses;
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