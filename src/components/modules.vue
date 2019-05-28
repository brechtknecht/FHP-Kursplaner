<template>
    <div class="modulesWrapper"> 
        <div v-for="category in modulePlan.basicStudyPeriod" class="category" :key="category.title">
            <h2>{{ category.title }}</h2>
            <div class="modules">
                <div v-for="module in category.modules" class="module" :key="module.id">
                    <h4> {{ module.id }} </h4>
                    <span>{{ module.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {

    computed : mapState([
      'modulePlan',
      'queries'
    ])
    
}
</script>
<style lang="scss">
    @import '../assets/scss/main.scss';


    .modulesWrapper {
        position: fixed;
        width: auto;
        height: 100vh;
        padding: 2.5rem 1.5rem;
        z-index: 100;
        right: 0;
        text-align: left;
        background: $white;
        -webkit-box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        -moz-box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
    }

    .modules {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1.5rem;
    }

    .module {
        border: 1px solid red;
    }
</style>


