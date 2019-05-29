<template>
    <div class="modules-container">
        <div class="gui">
            <button class="btn" @click="triggerModules" >show modules</button>
        </div>
        <div class="modulesWrapper" v-bind:class="{ active: isActive }"> 
            <div v-for="category in modulePlan.basicStudyPeriod" class="category" :key="category.title">
                <h2>{{ category.title }}</h2>
                <div class="modules">
                    <div v-for="module in category.modules" class="module" :key="module.id" :style="{background: module.colorCode}">
                        <h4> {{ module.id }} </h4>
                        <span>{{ module.title }}</span>
                    </div>
                    <div v-if="!category.modules">
                        <div v-for="studyType in category" :key="studyType.title">
                            <h4>{{ studyType.title }}</h4>
                            <div class="modules">
                                <div v-for="module in studyType.modules" class="module" :key="module.id" :style="{background: module.colorCode}">
                                    <h4> {{ module.id }} </h4>
                                    <span>{{ module.title }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            isActive: false
        }
    },
    computed : mapState([
      'modulePlan',
      'queries'
    ]),
    methods: {
        triggerModules: function (e) {
            this.isActive = !this.isActive;
        } 
    }
    
}
</script>
<style lang="scss" scoped>
    @import '../assets/scss/main.scss';

    .gui {
        position: fixed;
        z-index: 200;
        right: 0;
        .btn {
            width: 100px;
            height: 20px;
            top: 200px;
        }
    }

    .modulesWrapper {
        position: fixed;
        height: 100vh;
        width: 0;
        padding: 2.5rem 1.5rem;
        z-index: 100;
        right: -100%;
        text-align: left;
        background: $white;
        transition: $animation-default;
        -webkit-box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        -moz-box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        &.active {
            right: 0;
            width: 60rem;
        }
    }

    .modules {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1.5rem;
    }

    .module {
        width: 12rem;
        padding: .75rem 1.5rem 2rem 1.5rem;
        border: 1px solid $stroke;
        h4 {
            margin: .75rem 0;
        }
        &:hover {
            background: red;
        }
    }
</style>


