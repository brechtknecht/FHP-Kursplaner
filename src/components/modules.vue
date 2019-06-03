<template>
    <div class="modules-container">
        <div class="gui">
            <button class="btn moduleTrigger" @click="triggerModules" ></button>
        </div>
        <div class="modulesWrapper" v-bind:class="{ active: isActive }"> 
            <button @click="triggerModules">close</button>
            <div v-for="category in modulePlan.basicStudyPeriod" class="category" :key="category.title">
                <h1>{{ category.title }}</h1>
                <div class="modules">
                    <div v-for="module in category.modules" 
                         class="module" 
                         :key="module.id" 
                         :style="{background: module.colorCode}"
                         @click="moduleFilterTriggered">
                        <h4>  {{ module.id }} </h4>
                        <span>{{ module.title }}</span>
                    </div>
                    <!-- If the datastructure is deeper — go one layer deeper -->
                    <div v-if="!category.modules">
                        <div v-for="studyType in category" :key="studyType.title">
                            <h4>{{ studyType.title }}</h4>
                            <div class="modules">
                                <div v-for="module in studyType.modules" 
                                    class="module" 
                                    :key="module.id" 
                                    :style="{ background: module.colorCode }"
                                    @click="moduleFilterTriggered">
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
        triggerModules: function () {
            this.isActive = !this.isActive;
        },
        moduleFilterTriggered: function (event) {
            console.log(this);
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
        h4 {
            margin: .75rem 0 .5rem 0;
        }
        &:hover {
            background: red;
        }
    }
</style>


