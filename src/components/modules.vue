<template>
    <div class="modules-container" v-bind:class="{ closingModal: isActive}" @click.self="triggerModules">
        <div class="gui">
            <button class="btn moduleTrigger" :class="{ active: isActive, disabled: isDisabled }"
                @click="triggerModules">
                <div class="caption">Modulplan öffnen</div>
            </button>
        </div>
        <div v-if="this.$store.state.queries.examOrder == 'PO 2019'" class="modulesWrapper" :class="{ active: isActive }">
            <h4>Modulplan gemäß Studienordnung von 2019</h4>
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

    export default {
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
                return '';
            },
            examOrder: {
                get() {
                    return this.$store.state.queries.examOrder;
                },
                set(examOrder) {
                    this.$store.commit('SWITCH_STUDY_ORDER', examOrder);
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
                
                document.body.classList.toggle('modal-open');
            },
            hasNoCourse(id) {
                if(typeof this.$store.state.coursesStash.segments === 'undefined') {
                    return;
                }

                let courses = []
                this.$store.state.coursesStash.segments.forEach((segment) => {
                    segment.courses.forEach((course) => {
                        courses.push(course)
                    })
                })

                if (this.$store.state.queries.examOrder == 'PO 2019') {
                    for (const course of courses) {
                        if (course.module.simplifiedNr == id.replace('PO 2019 ', '')) {
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

    .selectionElement-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: $stroke;
        border-radius: 4px;
    }

    .selectionElement {
        height: 1rem;
    }

    .category {
        padding-top: 1rem;
        h1 {
            margin-bottom: 1rem;
        }
    }

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
            background-position: -10% center;
            background-size: 6.5rem;
            top: 45vh;
            right: 8rem;
            outline: none;
            transition: $animation-default;

            &.moduleTrigger {
                position: relative;
                z-index: -1;

                .caption {
                    font-family: 'FHPSun-Bold';
                    font-size: 1.15rem;
                    color: $active;
                    position: relative;
                    display: block;
                    white-space: pre;
                    width: 100%;
                    left: calc(-50% - 18px);
                    top: 3.5rem;
                    font-weight: normal;
                    opacity: 1;
                    transition: $animation-slow;
                }

                &.active {
                    right: 62rem;
                    background-position: 110% center;
                    transform: translateX(3rem);

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
        position: absolute;
        height: 100vh;
        width: 0;
        right: 0;
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
            transform: translateX(0rem);
            width: auto;
        }

        .examOrder {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: 1fr 1fr;
            padding-bottom: 2.5rem;
            @include for-phone-only () {
                grid-template-columns: 1fr;
            }
        }

        .radio--wrapper {
            display: flex;
            align-items: center;
            margin: 1rem 0;
            padding: 1rem 0 0 0;
            background: $c-light-grey;
        }
    }

    .modules {
        display: grid;
        grid-template-columns: repeat(3, 15rem);
        grid-gap: 1rem;
    }

    .module {
        width: 12rem;
        height: auto;
        cursor: pointer;
        padding: 1.25rem 1.5rem 2rem 1.5rem;
        clip-path: inset(0);
        border: 3px solid #fff !important;
        &:hover {
            clip-path: inset(0);
            border: 3px solid rgba(52, 117, 224, .2) !important;
        }
    
        &.active {
            clip-path: inset(0);
            border: 3px solid $active !important;
        }

        

        &.disabled {
            opacity: .4;
            clip-path: inset(0);
            border: 3px solid #fff !important;
            pointer-events: none;
        }

        span {
            margin-bottom: 0;
        }

        h4 {
            margin-bottom: 0 0 .5rem 0;
            line-height: 1.5rem;
            font-weight: normal;
        }

        &:hover {
            background: $white;
        }
    }
</style>