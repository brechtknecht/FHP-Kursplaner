<template>
  <div class="Kursangebot">
    <!-- Grundstudium / Hauptstudium und Suche -->
    <div class="meta-filter">
      <div class="select block">
        <select>
        <option value="..." selected>Grundstudium</option>
        <option value="..." >Hauptstudium</option>
      </select>
      </div>
      <Search></Search>
    </div>

    <!-- Kursauswahl toggles -->
    <div class="filter-toggles">
      <button 
        v-for="category in categories" 
        :key="category" 
        v-on:click="toggleCategory" 
        :class="[category, {active: categoryActive[category] }]"
        :style="{'border-color': 'var(--color-' + category + ')'}">
        {{category}}
      </button>
    </div>


    <!-- Wechsel zwischen Ansichten und Sortierung -->
    <div class="screenToggles">
      <button v-on:click="toggleCardView">Card View</button>
      <button v-on:click="toggleTableView">Table View</button>


      <!-- LÖSUNG des sort propbems -> API Calls eine Ebene höher -->
      <div class="select filter">
        <select v-model="selectedSort">
          <option value="category" selected>Modul</option>
          <!-- <option value="title">Kurstitel</option> -->
          <option value="teacher">Lehrende</option>
          <option value="day">Kurszeit</option>
        </select>
      </div>
    </div>
    
    <CourseView :selectedSort="this.selectedSort" :category="this.category" :currentView="this.currentView" @selectedSortEmit="handleBackData"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import CourseView from '@/components/CourseView.vue'
import Search from '@/components/base/Search.vue'

export default {
  name: 'Overview',
  components: {
    CourseView,
    Search
  },
  data(){
    return {
      // TODO: Mehrere Kategorien zum auswählen implementieren mit Toggle und Farbswitches
      category: ['Elementares_Gestalten'],
      categories: Array,
      selectedSort: 'category',
      currentView: 'tableView', 
      categoryActive: {
        'Elementares_Gestalten' : true
      }
    }
  },
  mounted(){
    axios
      .get("http://localhost:3000/courses/meta/category") 
      .then((res, req, next) => {
        this.categories = res.data;
      });
  },
  methods: {
    toggleCategory(event) {
      var firedCategory = event.target.classList[0];

      // Setzt die Hintergrundfarben der Buttons, je nachdem ob die Kategorie aktiviert ist oder nicht
      if(this.categoryActive[firedCategory] == undefined){
        this.$set(this.categoryActive, firedCategory, true);
      }  else{
        this.$set(this.categoryActive, firedCategory, !this.categoryActive[firedCategory]);
      }
      
    

      // Löscht Kategorie aus Liste, falls sie aktiv war
      for(var i = 0; i < this.category.length; i++){
        if(firedCategory == this.category[i]){
          this.$set(this.category, i, '');
          return;
        }
      }

      this.$set(this.category, this.category.length , firedCategory);
    },
    handleBackData(selectedSort){
      this.selectedSort = selectedSort;
    },
    toggleCardView() {
      this.currentView = 'cardView';
    },
    toggleTableView(){
      this.currentView = 'tableView';
    }
  }
}
</script>

<style lang="scss">
  /* Color Classes */
  .Atelier.active,
  .Atelier:hover{
    background: var(--color-Atelier);
  }

  .Elementares_Gestalten.active,
  .Elementares_Gestalten:hover{
    background: var(--color-Atelier);
  }

  .Kommunikationsdesign.active,
  .Kommunikationsdesign:hover{
    background: var(--color-Kommunikationsdesign);
  }

  .Produktdesign.active,
  .Produktdesign:hover{
    background: var(--color-Produktdesign);
  }

  .Interfacedesign.active,
  .Interfacedesign:hover{
    background: var(--color-Interfacedesign);
  }

  .Werkstatt.active,
  .Werkstatt:hover{
    background:  repeating-linear-gradient(
                45deg,
                var(--color-Werkstatt),
                var(--color-Werkstatt) 10px,
                #fff 10px,
                #fff 20px
              );
  }

  .Theorie.active,
  .Theorie:hover{
    background: var(--color-Werkstatt);
  }

  .filter {
    display: inline-block;
    margin-left: .5rem;
  }

  .meta-filter{
    display: flex;
    div {
      width: 50%;
    }
  }

  .filter-toggles {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
    button {
      font-family: 'FHPSun-Bold';
      font-size: 1.2rem;
      width: 30rem;
      color: #1a1919;
      margin: 0 .7rem;
      padding: .8rem 1rem;
      outline: none;
      cursor: pointer;
      border: 3px solid  #E4E4E3; 
      transition: var(--transition-default);
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>