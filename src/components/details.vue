<template>
    <div class="details-container" v-bind:class="{ closingModal: isActive}" @click.self="triggerDetails">
        <div class="detailsWrapper" v-bind:class="{ active: isActive }">
            <div class="gui">
                <button class="btn moduleTrigger" :class="{ active: isActive }" @click="triggerDetails" ></button>
            </div>
            <div class="details" v-if="isActive">
                <div class="header" :style="componentStyle">
                    <h4 class="category"> {{ currentCourseTitle.category }}</h4>
                    <h1 class="title"> {{ currentCourseTitle.title }} </h1>
                    <div class="badge">{{ currentCourseModuleId.studyOrder }}</div>
                    <h4 class="moduleId"> {{ currentCourseModuleId.moduleId }} — {{ currentCourse.subtitle }} </h4>
                    <ul>
                        <li v-if="currentCourse.teacher"> 
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
                    <div class="actions">
                        <button 
                            class="btn btn-primary remember" 
                            :class="{ selected : isSelected }"
                            @click="rememberCourse()">
                            <Checkbox 
                                :id="this.currentCourse._id" 
                                :key="this.currentCourse._id"
                                :isClickable="false"
                            ></Checkbox>
                            Merken
                        </button>
                        <button v-if="this.workspaceLink" class="btn btn-secondary workspace">
                            <a :href="this.workspaceLink" target="_blank">Zum Workspace</a>
                        </button>
                        <div v-else>
                            <button  class="btn btn-secondary workspace warning">
                                <a :href="'http://fhp.incom.org/search/' + currentCourseTitle.title + '/workspaces'" target="_blank">Suche auf Incom</a>
                            </button>
                        </div>
                    </div>
            </div>
            <div class="content">
                <h4>Kursbeschreibung</h4>
                <p> {{ currentCourseDescription }}</p>
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
            workspaceLink() {
                if(this.currentCourse.workspace == "") {
                    let description = this.currentCourse.description;
                    let RegExpWorkspaceLink = new RegExp(/(?:(https?:\/\/fhp\.incom\.org\/workspace\/\d+$))/gm);

                    let workspaceLink = RegExpWorkspaceLink.exec(description);

                    // Return extracted Link or Link to itself
                    return (workspaceLink) ? workspaceLink[0] : null
                } else {
                    return this.currentCourse.workspace;
                }
                
            },
            currentCourseDescription() {
                return this.currentCourse.description;
            },
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

    .details {
        display: flex;
        flex-direction: column;
        max-height: 100vh;
    }

    .gui {
        position: relative;
        height: 0;
        z-index: 1000;
        right: 0;
         @include for-phone-only {
             position: absolute;
             width: auto;
             left: 0;
         }
        .btn {
            width: 64px;
            height: 64px;
            border: none;
            border-radius: 50%;
            background: $active;
            background-image: url('../assets/img/none-cross.svg');
            background-repeat: no-repeat;
            background-position: -4% center;
            background-size: 6.5rem;
            top: 45vh;
            right: 5rem;
            outline: none;
            transition: $animation-slow;
            @include for-phone-only { 
                background-image: url('../assets/img/none-cross-vert.svg');
                background-position: 50% center;  
                background-size: 100%;
            }
            &.moduleTrigger {
                position: relative;
                z-index: -1;
                 @include for-phone-only { 
                    position: fixed;
                    top: 100vh;
                    left: 25vh;
                    z-index: 100 !important;
                 }
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
                    @include for-phone-only { 
                        top: calc(100vh - 8rem);
                        background-position: 50% 98%;
                    }
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

        &.btn-secondary {
            a {
                text-decoration: none;
                color: $c-font;
            }
        }
        &.warning {
            border: 1.5px solid $warn;
            a {
                color: $warn;
            }
        }
    }

    .header,
    .content {
        padding: 0 1.5rem 0 1.5rem;
        p {
            white-space: pre-line;
        }
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

        .actions {
            display: flex;
            position: absolute;
            bottom: -1.75rem;
            button {
                height: 3.5rem;
                &.remember {
                    // padding-top: 10px;
                }
                div {
                    position: relative;
                    top: -4px;
                }
            }
            span {
                display: block;
                position: absolute;
                left: 0;
                top: -3rem;
                &.warning {
                    color: red;
                }
            }
        }

    }

    .content {
        margin-top: 3rem;
        padding-bottom: 2rem;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        overflow-y: scroll;
        max-height: 35rem;

        h4 {
            font-weight: 700;
        }

        p {
            font-size: 1rem;
            line-height: 1.5rem;
            text-indent: .5rem hanging each-line;
        }
    }

    .details-container {
        transition: $animation-default;
        background: rgba(255, 255, 255, 0);
        &.closingModal {
            position: fixed;
            width: calc(100vw - 33rem);
            left: 0;
            background: rgba(255, 255, 255, .6);
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
        width: 33rem;
        text-align: left;
        background: $white;
        transition: $animation-default;
        -webkit-box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);
        box-shadow: -8px 0px 38px -7px rgba(0, 0, 0, 0.15);
        &.active {
            right: 0;
            @include for-phone-only {
                position: absolute;
                max-width: 100vw;
                overflow: auto;
                left: 0;
                .details {
                    max-height: initial;
                }
                .content {
                    max-height: initial;
                }
            }
        
        }
    }
</style>