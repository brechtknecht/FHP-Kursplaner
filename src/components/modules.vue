<template>
    <div class="modules-container" v-bind:class="{ closingModal: isActive}" @click.self="triggerModules">
        <div class="gui">
            <button class="btn moduleTrigger" :class="{ active: isActive, disabled: isDisabled }"
                @click="triggerModules">
                <div class="caption">Modulplan öffnen</div>
            </button>
        </div>
        <div v-if="this.$store.state.queries.examOrder == 'PO 2013'" class="modulesWrapper" :class="{ active: isActive }">
            <div v-for="category in this.studyType" class="category" :key="category.title">
                <h1>{{ category.title }}</h1>
                <div class="modules">
                    <div v-for="module in category.modules" class="module" :class="{ disabled: hasNoCourse(module.id) }"
                        :id="module.id" :key="module.id"
                        :style="[{ background: module.colorCode }, { border: '4px solid' + module.colorCode }]"
                        @click="moduleFilterTriggered">
                        <span :id="module.id"> {{ module.id.replace('PO 2013', '') }} </span>
                        <h4 :id="module.id"> {{ module.title }} </h4>
                    </div>

                    <!-- If the datastructure is deeper — go one layer deeper -->
                    <div v-if="!category.modules">
                        <div v-for="studyType in category" :key="studyType.title">
                            <h4>{{ studyType.title }}</h4>
                            <div class="modules">
                                <div v-for="module in studyType.modules" class="module"
                                    :class="{ disabled: hasNoCourse(module.id) }" :id="module.id" :key="module.id"
                                    :style="[{ background: module.colorCode }, { border: '4px solid' + module.colorCode }]"
                                    @click="moduleFilterTriggered">
                                    <span :id="module.id"> {{ module.id.replace('PO 2013', '') }} </span>
                                    <h4 :id="module.id">{{ module.title }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.$store.state.queries.examOrder == 'PO 2019'" class="modulesWrapper" :class="{ active: isActive }">
            <div v-for="category in this.studyType" class="category" :key="category.title">
                <h1>{{ category.title }}</h1>
                <div class="modules">
                    <div v-for="module in category.modules" class="module" :class="{ disabled: hasNoCourse(module.id) }"
                        :id="module.id" :key="module.id"
                        :style="[{ background: module.colorCode }, { border: '4px solid' + module.colorCode }]"
                        @click="moduleFilterTriggered">
                        <span :id="module.id"> {{ module.id.replace('PO 2019', '') }} </span>
                        <h4 :id="module.id"> {{ module.title }} </h4>
                        <span>{{ module.subtitle }}</span>
                    </div>

                    <!-- If the datastructure is deeper — go one layer deeper -->
                    <div v-if="!category.modules">
                        <div v-for="studyType in category" :key="studyType.title">
                            <h4>{{ studyType.title }}</h4>
                            <div class="modules">
                                <div v-for="module in studyType.modules" class="module"
                                    :class="{ disabled: hasNoCourse(module.id) }" :id="module.id" :key="module.id"
                                    :style="[{ background: module.colorCode }, { border: '4px solid' + module.colorCode }]"
                                    @click="moduleFilterTriggered">
                                    <span :id="module.id"> {{ module.id.replace('PO 2019', '') }} </span>
                                    <h4 :id="module.id">{{ module.title }}</h4>
                                    <span>{{ module.subtitle }}</span>
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
    import {
        mapState
    } from 'vuex'

    import Module from '@/components/module.vue'
    export default {
        components: {
            Module
        },
        data() {
            return {
                isActive: false
            }
        },
        computed: {
            // Detects if a course is existing
            studyType() {
                // Switches the interface based on the Study type queries from 
                // @/components/sidebar.vue
                if (this.queries.studyType == "Grundstudium") {
                    if (this.queries.examOrder == 'PO 2013') {
                        return this.modulePlan.old.basicStudyPeriod;
                    } else if (this.queries.examOrder == 'PO 2019') {
                        return this.modulePlan.new.basicStudyPeriod;
                    }

                }
                if (this.queries.studyType == "Hauptstudium") {
                    if (this.queries.examOrder == 'PO 2013') {
                        return this.modulePlan.old.mainStudyPeriod;
                    } else if (this.queries.examOrder == 'PO 2019') {
                        return this.modulePlan.new.mainStudyPeriod;
                    }

                }
                if (this.queries.studyType == "Master") {
                    if (this.queries.examOrder == 'PO 2013') {
                        return this.modulePlan.old.masterStudyPeriod;
                    } else if (this.queries.examOrder == 'PO 2019') {
                        return this.modulePlan.new.masterStudyPeriod;
                    }
                }
            },
            isDisabled() {
                if (this.queries.studyType == 'selectedCourses') {
                    return true;
                } else {
                    return false
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
                // document.getElementsByTagName('body').classlist.toggle('modal-open');
            },
            hasNoCourse(id) {
                if(typeof this.$store.state.coursesStash.data === 'undefined') {
                    return;
                }
                let courses = this.$store.state.coursesStash.data.data.semester.courses;

                if (this.$store.state.queries.examOrder == 'PO 2013') {
                    for (const course of courses) {
                        if (course.attributes.module.id == id) {
                            return false;
                        }
                    }
                }

                if (this.$store.state.queries.examOrder == 'PO 2019') {
                    for (const course of courses) {
                        if (course.attributes.module.id_new == id.replace('PO 2019 ', '')) {
                            return false;
                        }
                    }
                }




                return true;
            },
            moduleFilterTriggered: function (event) {
                let element = document.getElementById(event.target.id);
                if (element.classList.contains("disabled")) {
                    return;
                }
                element.classList.toggle('active');
                this.$store.commit('SET_MODULE_QUERY', event.target.id);
                this.$store.commit('QUERY_COURSES');
                this.$store.commit('PUSH_NOTIFICATION', {
                    message: 'Modulfilter deaktivieren',
                    action: 'WIPE_MODULE_QUERY'
                });
            }
        }

    }
</script>
<style lang="scss" scoped>
    @charset "utf-8";
    @import '../assets/scss/main.scss';

    .modules-container {
        display: flex;
        position: fixed;
        z-index: 100;
        right: -64px;

        @include for-phone-only {
            display: none;
        }

        &.closingModal {
            position: fixed;
            width: auto;
            right: 0;
            left: 0;
            background: rgba(255, 255, 255, .6);
            height: 100vh;
            z-index: 100;
        }
    }

    .gui {
        position: absolute;
        z-index: 100;
        right: 0;

        .btn {
            position: relative;
            width: 64px;
            height: 64px;
            border: none;
            border-radius: 50%;
            background: $active;
            background-image: url('../assets/img/arrow-cross.svg');
            background-repeat: no-repeat;
            background-position: -4% center;
            background-size: 6.5rem;
            top: 45vh;
            right: 8rem;
            outline: none;
            transition: $animation-default;

            &.moduleTrigger {
                position: relative;
                z-index: -1;

                .caption {
                    font-family: 'FHPSun-Regular';
                    font-size: 1rem;
                    color: $active;
                    position: relative;
                    display: block;
                    white-space: pre;
                    width: 100%;
                    left: calc(-50% - 10px);
                    top: 3.5rem;
                    font-weight: 900;
                    opacity: 1;
                    transition: $animation-slow;
                }

                &.active {
                    right: 62rem;
                    background-position: 110% center;

                    .caption {
                        opacity: 0;
                    }
                }

                &.disabled {
                    display: none;
                }
            }
        }
    }

    .modulesWrapper {
        position: relative;
        height: 100vh;
        width: 0;
        overflow-y: scroll;
        max-height: calc(100vh - 4rem);
        padding: 3.5rem 4.5rem;
        z-index: 300;
        transform: translateX(100vw);
        text-align: left;
        background: $white;
        transition: transform $animation-default;
        -webkit-box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);
        box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);

        &.active {
            transform: translateX(60rem);
            width: 60rem;
        }
    }

    .modules {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .module {
        width: 12rem;
        height: 7.5rem;
        cursor: pointer;
        padding: 1.25rem 1.5rem 2rem 1.5rem;
        clip-path: inset(3.2px);
        border: 3px solid $active !important;

        &.active {
            clip-path: inset(0);
        }

        &.disabled {
            opacity: .4;
        }

        span {
            margin-bottom: 0;
        }

        h4 {
            margin: .75rem 0 .5rem 0;
            line-height: 1.5rem;
            font-weight: 700;
        }

        &:hover {
            background: $white;
        }
    }
</style>