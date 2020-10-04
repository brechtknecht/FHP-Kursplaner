<template>
    <div class="details-container" v-bind:class="{ closingModal: isActive}" @click.self="triggerDetails">
        <div class="detailsWrapper" v-bind:class="{ active: isActive }">
            <div class="gui">
                <button class="btn moduleTrigger" :class="{ active: isActive }" @click="triggerDetails" ></button>
            </div>
            <div class="details" v-if="isActive">
                <div class="header" :style="componentStyle">
                    <div class="info">
                        <h4 class="category"> {{ currentCourseTitle.category }}</h4>
                        <h1 class="title"> {{ currentCourseTitle.title }} </h1>
                        <h4 class="subject">{{ currentCourse.subtitle }}</h4>
                    </div>
                    <div class="meta">
                        <div class="moduleId-wrapper">
                            <div class="badge">{{ currentCourseModuleId.studyOrder }}</div>
                            <h4 class="moduleId"> {{ currentCourseModuleId.moduleId }} </h4>
                        </div>
                        <div class="moduleId-wrapper">
                            <div class="badge">Neue Prüfungsordnung</div>
                            <h4 class="moduleId"> {{ currentCourse.module.id_new }} </h4>
                        </div>
                        <ul>
                            <li v-if="currentCourse.teacher"> 
                                <icon-base width="20" height="20" icon-name="head"><icon-head /></icon-base>
                                <span>{{ currentCourse.teacher }}</span> 
                            </li>
                            <li> 
                                <icon-base width="20" height="20" icon-name="clock"><icon-clock /></icon-base>
                                <span>{{ currentCourse.time.fixture.begin.String }} </span>
                            </li>
                            <li>
                                <icon-base width="20" height="20" icon-name="pin"><icon-pin /></icon-base> 
                                <span>Raum: {{ currentCourse.room }}</span> 
                            </li>
                            <li>
                                <icon-base width="20" height="20" icon-name="layer"><icon-layer /></icon-base> 
                                <span>Credits: {{ currentCourse.credits }} </span>
                            </li>
                        </ul>
                    </div>
                    <div class="actions">
                        <button 
                            class="btn btn-primary remember" 
                            :class="{ selected : isSelected }"
                            @click="rememberCourse()">
                            <Checkbox
                                :id="this.currentCourse._id" 
                                :key="this.currentCourse._id"
                                :isClickable="true"
                            ></Checkbox>
                            <span v-if="isSelected" class="checkbox-label">Ausgewählt</span>
                            <span v-if="!isSelected" class="checkbox-label">Auswählen</span>
                        </button>
                        <a v-if="this.workspaceLink" :href="this.workspaceLink" target="_blank">
                            <button class="btn btn-secondary workspace">
                                Zum Workspace
                            </button>
                        </a>
                        <div v-else>
                            <a :href="'http://fhp.incom.org/search/' + currentCourseTitle.title + '/workspaces'" target="_blank">
                                <button class="btn btn-secondary workspace warning">
                                    Suche auf Incom
                                </button>
                            </a>
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

                if (studyOrder[0] == 'PO 2013') {
                    studyOrder[0] = "Alte Prüfungsordnung"
                }

                return {
                    moduleId: moduleId,
                    studyOrder: studyOrder[0]
                }
            },         
            currentCourseTitle () {
                let regExBeforeComma = new RegExp(/[^:]*/);
                let regExAfterComma = new RegExp(/(:\s)(.*)/);

                let category = regExBeforeComma.exec(this.currentCourse.title);
                let title = regExAfterComma.exec(this.currentCourse.title);

                if(category == null) {category= ['undefined']}
                if(title == null) { title = category;}

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
                let background = this.currentCourse.colorCode;

                if(typeof background == 'undefined') {
                    background = '#D8F0F4';
                }

                // If color is something else then normal HEX-Value
                if(background.length > 7) {
                    return {
                        'border-top': '5rem solid transparent',
                        'border-image' : background,
                        'border-width' : "5rem",
                        'border-image-slice' : "70",
                        'color' : 'black',
                        'background' : '#D8F0F4',
                        'padding-top' : '0'
                    }
                }

                return {
                    'background': background,
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
            triggerDetails: function () {
                document.body.classList.toggle('modal-open');
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
        @include for-desktop-up () {
            .details-container {
                position: fixed;
                width: 100vw !important;
                left: 0;
                right: 0;
            }
            .closingModal {
                width: 100vw !important;
            }
            .details {
                flex-direction: row;
                max-height: none !important;
                height: 100%;
            }
            .detailsWrapper {
                width: 80vw !important;
                right: 10vw;
                left: 10vw;
                max-height: calc(100vh - 7.5rem);
                bottom: -80rem;
                opactity: 0;
            }
            .detailsWrapper.active {
                top: 2.5rem;
                left: 50%;
                transform: translateX(-50%);
                display: block;
                width: 80vw !important;
                max-height: calc(100vh - 7.5rem);
                overflow: hidden;
                padding: 0;
                right: 0;
                bottom: 0;
                opactity: 1;
                
                
            }

            .header {
                width: clamp(450px, 4vw, 40%);
            }
            .content {
                width: 60%;
            }

            .header,
            .content {
                height: auto;
                max-height: none !important;
            }

            .actions {
                bottom: 1.25rem !important;
            }
        }
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
            transition: $animation-default;
            & > * {
                font-weight: normal;
                font-style: normal;
            }
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
                    font-size: 1.25rem;
                    color: $active;
                    position: relative;
                    display: block;
                    white-space: pre;
                    width: auto;
                    left: calc(-50% - 16px);
                    top: 3.5rem;
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

    .checkbox-label {
        display: inline-block;
    }

    .btn {
        width: 175px;
        height: 2rem;
        top: 200px;
        background: $c-light-grey;
        margin-right: 1rem;
        border: 1px solid $c-font;
        border-radius: 8px;

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
            border: 2px solid $warn;
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

        .moduleId-wrapper {
            margin-top: .75rem;
            @include for-phone-only { 
                margin-top: 0;
            }
        }

        .info {

        }

        .meta {

        }

        h4.category {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            line-height: 1.5rem;
            min-height: 3rem;
        }

        h1.title {
            margin-top: 1rem;
            margin-bottom: .75rem;
        }

        h4.moduleId {
            font-size: 1rem;
            display: inline;
            @include for-phone-only {
                margin-top: 1rem;
                line-height: 3rem;
                font-weight: normal;
            }
        }

        h4.subject {
            margin-top: .25rem;
            margin-bottom: 2rem;
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
                width: 11.5rem;
                div {
                    position: relative;
                    top: -4px;
                }
            }
            span {
                display: inline-block;
                position: relative;
                left: 0;
                top: -4px;
                left: .25rem;
                font-size: 1.2rem;
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
        @include for-phone-only { 
            padding-bottom: 10rem;
        }

        h4 {
            font-weight: normal;
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
            // width: calc(100vw - 33rem);
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
        @include for-phone-only { 
            right: auto;
            top: 100vh;
        }

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
                top: 0;
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