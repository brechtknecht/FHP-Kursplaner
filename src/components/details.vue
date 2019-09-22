<template>
    <div class="details-container" v-bind:class="{ closingModal: isActive}" @click.self="triggerDetails">
        <div class="detailsWrapper" v-bind:class="{ active: isActive }">
            <div class="gui">
                <button class="btn moduleTrigger" :class="{ active: isActive }" @click="triggerDetails" ></button>
            </div>
            <div v-if="isActive">
                <div class="header" :style="componentStyle">
                    <h4 class="category"> {{ currentCourseTitle.category }}</h4>
                    <h1 class="title"> {{ currentCourseTitle.title }} </h1>
                    <div class="badge">{{ currentCourseModuleId.studyOrder }}</div>
                    <h4 class="moduleId"> {{ currentCourseModuleId.moduleId }} — {{ currentCourse.subtitle }} </h4>
                    <ul>
                        <li> 
                            <icon-base width="20" height="20" icon-name="head"><icon-head /></icon-base>
                            <div>{{ currentCourse.teacher }}</div> 
                        </li>
                        <li> 
                            <icon-base width="20" height="20" icon-name="clock"><icon-clock /></icon-base>
                            <div>{{ currentCourse.time.fixture.begin.String }} </div>
                        </li>
                        <li>
                            <icon-base width="20" height="20" icon-name="pin"><icon-pin /></icon-base> 
                            <div>Raum: {{ currentCourse.room }}</div> 
                        </li>
                        <li>
                            <icon-base width="20" height="20" icon-name="layer"><icon-layer /></icon-base> 
                            <div>Credits: {{ currentCourse.credits }} </div>
                        </li>
                    </ul>
                    <button 
                        class="btn btn-primary remember" 
                        :class="{ selected : isSelected }"
                        @click="rememberCourse()">
                        <Checkbox @click="rememberCourse()"></Checkbox>
                        Merken
                    </button>
                    <button class="btn btn-secondary workspace">Zum Workspace</button>
            </div>
            <div class="content">
                <h4>Kursbeschreibung</h4>
                <p> {{ currentCourse.description }}</p>
            </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'

    import Checkbox from '@/components/base/checkbox'
    import IconBase from '@/components/base/IconBase';
    import IconHead from '@/assets/icon/IconHead'
    import IconClock from '@/assets/icon/IconClock'
    import IconLayer from '@/assets/icon/IconLayer'
    import IconPin from '@/assets/icon/IconPin'

    export default {
        components: {
            IconBase,
            IconClock,
            IconLayer,
            IconPin,
            IconHead,
            Checkbox
        },
        computed: {
            currentCourseModuleId () {
                let regExStudyOrder = new RegExp(/^PO \d{4}/);

                let studyOrder = regExStudyOrder.exec(this.currentCourse.module.id);
                let moduleId = this.currentCourse.module.id.replace(studyOrder, '');

                return {
                    moduleId: moduleId,
                    studyOrder: studyOrder[0]
                }
            },         
            currentCourseTitle () {
                let regExBeforeComma = new RegExp(/[^:]*/);
                let regExAfterComma = new RegExp(/(\:\s)(.*)/);

                let category = regExBeforeComma.exec(this.currentCourse.title);
                let title = regExAfterComma.exec(this.currentCourse.title);

                if(category == null) {category= ['undefined']}
                if(title == null) {title= ['undefined']}

                return {
                    category: category[0],
                    title: title[0].replace(': ', '')
                }
            },
            isActive() {
                return this.$attrs.isActive;
            },
            isSelected() {
                let rememberedCoursesRef = this.$store.state.user.rememberedCourses;
                let id = this.currentCourse._id;

                if (rememberedCoursesRef.includes(id)) {
                    return true;
                }

                return false;
            },
            componentStyle() {
                // Checks if a color is refered in the modules json in the store.js file
                let colorMode = this.currentCourse.colorCode ? this.lightOrDark(this.currentCourse.colorCode) : 'light'
                let color = colorMode == 'light' ? color = '#3D4043' : color = '#fff'

                return {
                    'background': this.currentCourse.colorCode,
                    'color': color
                }
            },
            ...mapState([
                'currentCourse'
            ])
        },
        methods: {
            rememberCourse: function () {
                this.$store.commit('USER_ADD_REMEMBERED_COURSE', this.$store.state.currentCourse._id);
            },
            triggerDetails: function (e) {
                this.$store.commit('VIEW_DETAILS_SELECTED', false);
                this.$emit('CURRENT_COURSE_TRIGGERED');
            },
            lightOrDark: function (color) {
                // Variables for red, green, blue values
                var r, g, b, hsp;

                // Check the format of the color, HEX or RGB?
                if (color.match(/^rgb/)) {

                    // If HEX --> store the red, green, blue values in separate variables
                    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

                    r = color[1];
                    g = color[2];
                    b = color[3];
                } else {

                    // If RGB --> Convert it to HEX: http://gist.github.com/983661
                    color = +("0x" + color.slice(1).replace(
                        color.length < 5 && /./g, '$&$&'));

                    r = color >> 16;
                    g = color >> 8 & 255;
                    b = color & 255;
                }

                // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
                hsp = Math.sqrt(
                    0.299 * (r * r) +
                    0.587 * (g * g) +
                    0.114 * (b * b)
                );

                // Using the HSP value, determine whether the color is light or dark
                if (hsp > 170) {

                    return 'light';
                } else {

                    return 'dark';
                }
            }
        }

    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/main.scss';

    .details-container {
        display: flex;
        position: fixed;
        z-index: 100;
        right: 0;
    }

    .gui {
        position: relative;
        height: 0;
        z-index: 1000;
        right: 0;
        .btn {
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
            right: 5rem;
            outline: none;
            transition: $animation-slow;
            &.moduleTrigger {
                position: relative;
                z-index: -1;
                .caption {
                    font-family: 'FHPSun-Bold';
                    font-size: 1rem;
                    color: $active;
                    position: relative;
                    display: block;
                    white-space: pre;
                    width: 100%;
                    left: calc(-50% - 16px);
                    top: 3.5rem;
                    font-weight: 900;
                    opacity: 1;
                    transition: $animation-default;
                }
                &.active {
                    background-position: 110% center;
                    .caption {
                        opacity: 0;
                    }
                }
            }
        }
    }

    .btn {
        width: 200px;
        height: 2rem;
        top: 200px;
        background: $c-light-grey;
        margin-right: 1rem;
        border: 1.5px solid $c-font;
        border-radius: 3rem;

        &.selected {
            background: $active;
            border: transparent;
            color: #fff !important;
        }

        &.btn-primary {
            border: 2px solid $active;
            color: $active;
            & > div {
                display: inline;
            }
        }

        &.remember {
            position: relative;
            height: 3rem;
            top: calc(100% - 2rem);
            left: 0;
        }

        &.workspace {
            position: relative;
            height: 3rem;
            top: calc(100% - 2rem);
        }
    }

    .header,
    .content {
        padding: 0 1.5rem 0 1.5rem;
    }

    .header {
        position: relative;
        padding-top: 3rem;
        padding-bottom: 3rem;

        h4.category {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
        }

        h1.title {
            margin-top: 1rem;
        }

        h4.moduleId {
            display: inline;
        }

        ul {
            margin-top: 2rem;
            margin-left: .25rem;
            li {
                line-height: 1.8rem;
                svg {
                    position: relative;
                    top: .3rem;
                }
                div {
                    display: inline-block;
                    margin-left: .25rem;
                }
            }
        }

        .badge {
            font-family: 'FHPSun-Bold';
            display: inline-block;
            margin-right: .5rem;
            background: #fff;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
        }
    }

    .content {
        margin-top: 3rem;
        padding-bottom: 2rem;
        overflow-y: scroll;
        max-height: 35rem;

        h4 {
            font-weight: 700;
        }

        p {
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }

    .details-container {
        &.closingModal {
            position: fixed;
            width: calc(100vw - 30rem);
            left: 0;
            height: 100vh;
            z-index: 100;
        }
    }

    .detailsWrapper {
        position: fixed;
        height: 100vh;
        width: 0;
        padding: 0 0 2.5rem 0;
        z-index: 200;
        max-height: 100vh;
        overflow: none;
        right: -40rem;
        width: 30rem;
        text-align: left;
        background: $white;
        transition: $animation-default;
        -webkit-box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);
        box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);

        &.active {
            right: 0;
        }
    }
</style>