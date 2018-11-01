<template>
    <div class="table">
      <div class="table-head">
        <div v-on:click="handleBackData('correspondingModule')">Modul</div>
        <div v-on:click="handleBackData('title')">Kurstitel</div>
        <div v-on:click="handleBackData('teacher')">Lehrende</div>
        <div v-on:click="handleBackData('day')">Kurszeit</div>
        <div>gepinnt</div>
      </div>
      <div class="table-content" v-if="courses.courses.length > 0">
        <div class="table-cell" 
              v-for="course in courses.courses" 
              :key="course._id"
              :style="{'background': 'var(--color-' + course.category + ')'}"> 
          <div class="correspondingModule">{{ course.moduleId }} – {{ course.correspondingModule }}</div>
          <div class="title">{{ course.title }}</div>
          <div class="teacher">{{ course.teacher }}</div>
          <div class="day">{{ course.day }}:  {{ course.time }}</div>
          <div class="addToPlan"> <span> + </span> </div>
        </div>
      </div>
      <div v-else>
          Keine filter ausgewäht du spast

      </div>
    </div>
</template>

<script>

export default {
  name: 'TableView',
  props: {
      courses: {}
  },
  data () {
      return {
        sort: {
          sort_asc: String,
          sort_desc: String
        }
      }
  },
  methods : {
    handleBackData (call){
      this.sort.sort_asc = call;
      this.sort.sort_desc = call;
      this.$emit('sortEmit', this.sort)
    }
  }
}
</script>

<style lang="scss">
.table-cell,
.table-head {
  display: grid;
  grid-template-columns:  1.5fr 4fr 2fr 2fr 0.6fr;
  font-size: .9rem;
}

.table-head {
  border-bottom: 2px solid #1a1919;
  & > div {
    margin: 1rem 1rem;
  } 
}

.table-content {
  display: grid;
  grid-auto-rows: 1fr;
  .table-cell {
    background: #E4E4E3;
    overflow: hidden;
    margin-bottom: 0.7rem;
    align-items: center;
    &:first-child {
      margin-top: 0 !important;
    }
    & > div {
      margin: 1.2rem 1rem;
    } 
    .addToPlan {
      font-family: 'FHPSun-Bold';
      font-size: 1.5rem;
      line-height: 1rem;
      text-align: center;
    }
  }
}
</style>