import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jsonPath from 'jsonpath'

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
      sorting: {
        //...
      }
    },
    courses: [],
    coursesStash: [],
    modulePlan: {
      basicStudyPeriod: {
        elementares_gestalten: {
          title: "I/1 Gestaltungsgrundlagen",
          modules: [{
            id: "11EG-B",
            title: "Basics",
            colorCode: "#E7E8E9"
          },{
            id: "11EG-KB",
            title: "Kontext",
            colorCode: "#E7E8E9"
          },{
            id: "11EG-P",
            title: "Prozess",
            colorCode: "#E7E8E9"
          },{
            id: "11-AT",
            title: "Atelier",
            colorCode: "#E7E8E9"
          }]
        },
        entwurfsgrundlagen: {
          title: "I/2 Entwurfsgrundlagen",
          interfacedesign: {
            title: "Interfacedesign",
            modules: [{
              id: "12EId-MK",
              title: "Mensch + Kontext",
              colorCode: "#D8F0F4"
            },{
              id: "12EId-MP",
              title: "Methoden + Prozesse",
              colorCode: "#D8F0F4"
            },{
              id: "12EId-FI",
              title: "Form + Interaktion",
              colorCode: "#D8F0F4"
            },{
              id: "12EId-AD",
              title: "Algorithmen + Daten",
              colorCode: "#D8F0F4"
            }]
          },
          kommunikationsdesign: {
            title: "Kommunikationsdesign",
            modules: [{
              id: "12EKd-SA",
              title: "Schrift + Ausdruck",
              colorCode: "#EDF3DA"
            },{
              id: "12EKd-BW",
              title: "Bild + Wirkung",
              colorCode: "#EDF3DA"
            },{
              id: "12EKd-FN",
              title: "Formate + Narration",
              colorCode: "#EDF3DA"
            },{
              id: "12EKd-ZA",
              title: "Zeichen + Ansprache",
              colorCode: "#EDF3DA"
            }]
          },
          produktdesign: {
            title: "Produktdesign",
            modules: [{
              id: "12EPd-ST",
              title: "Material + Technik",
              colorCode: "#CFE4BC"
            },{
              id: "12EPd-FG",
              title: "Form + Gestaltung",
              colorCode: "#CFE4BC"
            },{
              id: "12EPd-RK",
              title: "Raum + Kontext",
              colorCode: "#CFE4BC"
            },{
              id: "12EPd-OI",
              title: "Objekt + Intention",
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
        }
      }
    }
  },
  actions: {
    async loadCourses ({commit, dispatch}, queries) {
        await axios
          .get('http://localhost:3000/courses')
          .then(r => r.data)
          .then((result) => {
            commit('STASH_LOADED_COURSES', result);
            return;
          })
    },
    SWITCH_STUDY_TYPE ({commit}, studyType) {
      commit('SWITCH_STUDY_TYPE', studyType);
    }
  },
  mutations: {
    STASH_LOADED_COURSES (state, courses) {
      state.coursesStash = courses;
    },
    SWITCH_STUDY_TYPE (state, payload) {
      state.queries.studyType = payload;
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
      }

      

      // 2. Select all weekdays you need from the specification
      let monday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 1)]");
      let tuesday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 2)]");
      let wednesday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 3)]");
      let thursday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 4)]");
      let friday = jsonPath.query(courses, "$[?(@.attributes.time.fixture.begin.day.value == 5)]");

      courses = {
        status: {
          ready: true
        },
        days: {
          monday: {
            string: "Montag",
            data: monday,
            key: "monday"
          },
          tuesday: {
            string: "Dienstag",
            data: tuesday,
            key: "tuesday",
          },
          wednesday: {
            string: "Mittwoch",
            data: wednesday,
            key: "wednesday"
          },
          thursday: {
            string: "Donnerstag",
            data: thursday,
            key: "thursday"
          },
          friday: {
            string: "Freitag",
            data: friday,
            key: "friday"
          }
        }
      }
      state.courses = courses;
    }
  }
  
})