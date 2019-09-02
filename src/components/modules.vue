<template>
    <div class="modules-container">
        <div class="gui">
            <button class="btn moduleTrigger" @click="triggerModules" ></button>
        </div>
        <div class="modulesWrapper" v-bind:class="{ active: isActive }"> 
            <button @click="triggerModules">close</button>
            <div v-for="category in this.studyType" class="category" :key="category.title">
                <h1>{{ category.title }}</h1>
                <div class="modules">
                    <div v-for="module in category.modules" 
                         class="module" 
                         :id="module.id"
                         :key="module.id" 
                         :style="[{ background: module.colorCode }, { border: '4px solid' + module.colorCode }]"
                         @click="moduleFilterTriggered">
                         <h4 :id="module.id"> {{ module.id }} </h4>
                         <span :id="module.id"> {{ module.title }} </span>
                    </div>
                    <!-- If the datastructure is deeper — go one layer deeper -->
                    <div v-if="!category.modules">
                        <div v-for="studyType in category" :key="studyType.title">
                            <h4>{{ studyType.title }}</h4>
                            <div class="modules">
                                <div v-for="module in studyType.modules" 
                                    class="module" 
                                    :id="module.id"
                                    :key="module.id" 
                                    :style="[{ background: module.colorCode }, { border: '4px solid' + module.colorCode }]"
                                    @click="moduleFilterTriggered">
                                    <h4 :id="module.id"> {{ module.id }} </h4>
                                    <span :id="module.id">{{ module.title }}</span>
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

import Module from '@/components/module.vue'
export default {
    components: {
        Module
    },
    data () {
        return {
            isActive: false
        }
    },
    computed : {
        studyType() {
            // Switches the interface based on the Study type queries from 
            // @/components/sidebar.vue
            if(this.queries.studyType == "Grundstudium") {
                return this.modulePlan.basicStudyPeriod;
            }
            if(this.queries.studyType == "Hauptstudium") {
                return this.modulePlan.mainStudyPeriod;
            }
            if(this.queries.studyType == "Master") {
                return this.modulePlan.masterStudyPeriod;
            }
        },
        ...mapState([
        'modulePlan',
        'queries'
        ])
    },
    methods: {
        triggerModules: function () {
            this.isActive = !this.isActive;
        },
        moduleFilterTriggered: function (event) {
            document.getElementById(event.target.id).classList.toggle('active');
            this.$store.commit('SET_MODULE_QUERY', event.target.id);
            this.$store.commit('QUERY_COURSES');
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
            width: 64px;
            height: 64px;
            border: none;
            border-radius: 50%;
            background: $active;
            top: 45vh;
            right: 2rem;
            outline: none;
            &.moduleTrigger {
                position: relative;
                z-index: -1;
                &:before {
                    content: 'Moldulplan anzeigen';
                    font-family: 'FHPSun-Bold';
                    color: $active;
                    position: relative;
                    display: block;
                    width: 100%;
                    left: -150%;
                    font-weight: 900;
                }
            }
        }
    }

    .modulesWrapper {
        position: fixed;
        height: 100vh;
        width: 0;
        overflow-y: scroll;
        max-height: calc(100vh - 4rem);
        padding: 2.5rem 1.5rem;
        z-index: 300;
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
        grid-gap: 1rem;
    }

    .module {
        width: 9rem;
        height: 4rem;
        cursor: pointer;
        padding: .75rem 1.5rem 2rem 1.5rem;
        clip-path: inset(3.2px);
        border: 3px solid $active !important;
        &.active {
            clip-path: inset(0);
        }
        h4 {
            margin: .75rem 0 .5rem 0;
        }
        &:hover {
            background: $white;
        }
    }
</style>


