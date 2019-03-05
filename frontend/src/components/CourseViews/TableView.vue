<template>
  <div class="table">
    <div class="table-head">
      <div class="sortable" v-on:click="[handleBackData('category'), sortActive()]">Modul</div>
      <div>Kurstitel</div>
      <div class="sortable" v-on:click="handleBackData('teacher'), sortActive()">Lehrende</div>
      <div class="sortable" v-on:click="handleBackData('day'), sortActive()">Kurszeit</div>
      <div>gepinnt</div>
    </div>
    <div class="table-content" v-if="courses.courses.length > 0">
      <div class="table-cell" v-for="course in courses.courses" :key="course._id" :style="{'background': 'var(--color-' + course.category + ')'}">
        <div class="correspondingModule">{{ course.moduleId }} – {{ course.correspondingModule }}</div>
        <div class="title">{{ course.title }}</div>
        <div class="teacher">{{ course.teacher }}</div>
        <div class="day">{{ course.day }}: {{ course.time }}</div>
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
    data() {
      return {
        sort: {
          sort_asc: String,
          sort_desc: String,
          sort_active: false
        }
      }
    },
    methods: {
      handleBackData(call) {
        this.sort.sort_asc = call;
        this.sort.sort_desc = call;
        this.$emit('sortEmit', this.sort)
      },
      sortActive() {

        event.target.classList.add('active');

        var tableHeads = document.querySelectorAll('.sortable');
        var cells = document.querySelectorAll('.' + this.sort.sort_asc);

        for(var i = 0; i < cells.length; i++){
          cells[i].classList.add('active');
        }

        for (var i = 0; i < tableHeads.length; i++) {
          if (tableHeads[i] === event.target) continue;
          tableHeads[i].classList.remove('active');
        }
      }
    }
  }
</script>

<style lang="scss">
  .table-cell,
  .table-head {
    display: grid;
    grid-template-columns: 1.5fr 4fr 2fr 2fr 0.6fr;
    font-size: .9rem;

    & .active {
      font-family: 'FHPSun-Bold';
    }

    .sortable {
      cursor: pointer;

      & .active {
        font-family: 'FHPSun-Bold';
      }

      &:hover:before {
        opacity: 1;
      }

      &:before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: .5rem;
        opacity: .5;
        transition: var(--transition-default);
        background-image: url('/assets/icons/down-arrow.svg');
      }

      &.active {
        font-weight: 600;

        &:before {
          opacity: 1;
        }
      }
    }
  }

  .table-head {
    border-bottom: 2px solid #1a1919;

    &>div {
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

      &>div {
        margin: 1.1rem 1rem;
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