<template>
  <!-- Table View -->
  <div v-if="this.currentView == 'tableView'">
      <TableView :courses="this.courses" :sort="this.sort"
                  @sortEmit="handleBackData"/>
  </div>
  <!-- End Table View -->

  <!-- Card View -->

  <div v-else-if="this.currentView == 'cardView'">
      <CardView :courses="this.courses" :sort="this.sort"/>
  </div>

  <!-- End Card View -->
</template>

<script>
import axios from 'axios';
import TableView from '@/components/CourseViews/TableView.vue'
import CardView from '@/components/CourseViews/CardView.vue'

export default {
  name: 'CourseView',
  components: {
    TableView,
    CardView
  },
  data() {
    return {
      courses: Object,
      sort: {
        sort_asc : this.selectedSort,
        sort_desc : this.selectedSort
      }
    }
  },
  props: {
    category: Array,
    currentView: String,
    selectedSort: String
  },
  methods : {
    handleBackData(sort) {
      this.sort = sort;
    }
  },
  mounted(){
    axios
      .get("http://localhost:3000/courses", {
        params: {
          category: this.category,
          sort_asc: this.sort.sort_asc
        }
      }) 
      .then((res, req, next) => {
        this.courses = res.data;
      });
  },
  watch: {
    category() {
      axios
      .get("http://localhost:3000/courses", {
        params: {
          category: this.category,
          sort_asc: this.sort.sort_asc
        }
      }) 
      .then((res, req, next) => {
        this.courses = res.data;
      });
    },
    selectedSort() {
      console.log('sdsadsa')
    },
    sort: {
      handler: function () {
        axios
        .get("http://localhost:3000/courses", {
          params: {
            category: this.category,
            sort_asc: this.sort.sort_asc
          }
        }) 
        .then((res, req, next) => {
          this.courses = res.data;
        });
        },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
