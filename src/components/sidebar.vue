<template>
    <div class="sidebar--wrapper">
        <div class="sidebar">
            <h2>
                <b>Fachbereich Design</b>
                Lehrangebot</h2>
            <hr>
            <h4>Studienabschnitt</h4>
            <div class="studySelection">
                <label class="container selectionElement">
                    <input type="radio" checked="checked" name="studyType" value="Grundstudium" v-model="studyType">
                    <div class="checkmark">
                        <span>Grundstudium</span>
                    </div>
                </label>
                <label class="container selectionElement">
                    <input type="radio"  name="studyType" value="Hauptstudium" v-model="studyType">
                    <div class="checkmark">
                        <span>Hauptstudium</span>
                    </div>
                </label>
                <label class="container selectionElement">
                    <input type="radio"  name="studyType" value="Master" v-model="studyType">
                    <div class="checkmark">
                        <span>Master</span>
                    </div>
                </label>
                <label class="container selectionElement">
                    <input type="radio"  name="studyType" value="selectedCourses" v-model="studyType">
                    <div class="checkmark">
                        <span>Ausgewählt</span>
                        <span v-if="this.numberOfCoursesSelected && numberOfCoursesSelected < 10" class="badge">{{ numberOfCoursesSelected }}</span>
                        <span v-if="this.numberOfCoursesSelected && numberOfCoursesSelected >= 10" class="badge badge--centered">{{ numberOfCoursesSelected }}</span>
                    </div>
                </label>
            </div>
            <hr>
            <h4>Wochentage</h4>
            <ul>
                <li class="listElement Montag" :class="{ active: monday, disabled: _hasMonday }" @click="scrollToDay">Montag</li>
                <li class="listElement Dienstag" :class="{ active: tuesday, disabled: _hasTuesday }" @click="scrollToDay">Dienstag</li>
                <li class="listElement Mittwoch" :class="{ active: wednesday, disabled: _hasWednesday }" @click="scrollToDay">Mittwoch</li>
                <li class="listElement Donnerstag" :class="{ active: thursday, disabled: _hasThursday }" @click="scrollToDay">Donnerstag</li>
                <li class="listElement Freitag" :class="{ active: friday, disabled: _hasFriday }" @click="scrollToDay">Freitag</li>
            </ul>
            <hr>
            <h4>Anmeldung</h4>
            <div class="auth">
                <div v-if="this.$store.state.user.status != '' && !this.$store.state.user.error" class="user">
                    <span>Angemeldet mit Code <br></span>
                    <div class="loggedUser">
                        <span>{{ this.$store.state.user.name }}</span>
                    </div>
                </div>
                <button v-if="this.$store.state.user.status != '' && !this.$store.state.user.error" class="button button__medium" @click="logout()">Logout</button>
                <button v-else class="button button__medium" @click="login()">Anmelden</button>
            </div>
            <radio-button style="display: none"></radio-button>
            <!-- <hr>
            <h4>Sortieren nach:</h4>
            <ul class="courseFilters">
                <li class="listElement Kursnummer" :class="{ active: true }" @click="0">Kursnummer</li>
                <li class="listElement Zeit" :class="{ active: false }" @click="0">Zeit</li>
            </ul> -->
        </div>
    </div>
</template>

<script>
    import smoothscroll from 'smoothscroll-polyfill';
    import {
        mapState
    } from 'vuex'
    import RadioButton from '@/components/base/radioButton.vue'

    export default {
        name: 'Sidebar',
        components: {
            RadioButton
        },
        computed: {
            studyType: {
                get() {
                    return this.$store.state.queries.studyType;
                },
                set(studyType) {
                    this.$store.dispatch('SWITCH_STUDY_TYPE', studyType);
                }
            },
            examOrder: {
                get() {
                    return this.$store.state.queries.examOrder;
                },
                set(examOrder) {
                    this.$store.commit('SWITCH_STUDY_ORDER', examOrder);
                }
            },
            activeDays: {
                get() {
                    return Object.values(this.$store.state.view.activeDays);
                }
            },
            _hasMonday () {
                return this.getEmptyState(0);
            },
            _hasTuesday () {
                return this.getEmptyState(1);
            },
            _hasWednesday  () {
                return this.getEmptyState(2);
            },
            _hasThursday () {
                return this.getEmptyState(3);
            },
            _hasFriday () {
                return this.getEmptyState(4);
            },
            monday: function () {
                if(this.$store.state.queries.studyType == 'selectedCourses') {
                    if(this.$store.state.courses.days[0].data.length > 0) {
                        return true
                    }
                    return false
                } else {
                    for (let day of this.activeDays) {
                        if (day == "Montag") {
                            return true;
                        }
                    }
                }
                return false
            },
            tuesday: function () {
                if(this.$store.state.queries.studyType == 'selectedCourses') {
                    if(this.$store.state.courses.days[1].data.length > 0) {
                        return true
                    }
                    return false
                } else {
                    for (let day of this.activeDays) {
                        if (day == "Dienstag") {
                            return true;
                        }
                    }
                }
                return false
            },
            wednesday: function () {
                if(this.$store.state.queries.studyType == 'selectedCourses') {
                    if(this.$store.state.courses.days[2].data.length > 0) {
                        return true
                    }
                    return false
                } else {
                    for (let day of this.activeDays) {
                        if (day == "Mittwoch") {
                            return true;
                        }
                    }
                }
                return false
            },
            thursday: function () {
                if(this.$store.state.queries.studyType == 'selectedCourses') {
                    if(this.$store.state.courses.days[3].data.length > 0) {
                        return true
                    }
                    return false
                } else {
                    for (let day of this.activeDays) {
                        if (day == "Donnerstag") {
                            return true;
                        }
                    }
                }
                return false
            },
            friday: function () {
                if(this.$store.state.queries.studyType == 'selectedCourses') {
                    if(this.$store.state.courses.days[4].data.length > 0) {
                        return true
                    }
                    return false
                } else {
                    for (let day of this.activeDays) {
                        if (day == "Freitag") {
                            return true;
                        }
                    }
                }
                return false
            },

            numberOfCoursesSelected: function () {
                let count = this.$store.state.user.rememberedCourses.length;
                return (count > 0) ? count : ''
            },

            ...mapState([
                'view'
            ])
        },
        methods: {
            getEmptyState () {
                // 👉 Escape for initial load
                if (typeof this.$store.state.courses.days[0] === "undefined") { 
                    return false;
                }
                return this.$store.state.courses.days[0].isEmpty;
            },
            login() {
                this.$store.commit('CHECK_AUTH')
            },
            logout () {
                this.$store.dispatch('logout')
            },
            scrollToDay: function (e) {
                let ref = e.target.classList[1];
                let element = document.getElementsByClassName(ref).item(1);

                console.log(element);
                smoothscroll.polyfill();
                window.scroll({
                    top: element.offsetTop,
                    behavior: 'smooth', 
                });

            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/main.scss';

    ul {
        list-style-type: none;
        padding: 0;
    }

    hr {
        margin-top: 1.5rem;
    }
    .sidebar--wrapper {
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .sidebar {
        position: fixed;
        width: 15rem;
        height: calc(100vh - 5rem);
        padding: 2.5rem 1.5rem;
        z-index: 100;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
        overflow-y: auto;
        text-align: left;
        background: $c-light-grey;
        h2,
        h4 {
            margin-left: 1.5rem;
        }
        @include for-phone-only {
            display: none;
        }
    }

    .auth {
        padding: 0 1.5rem;
        .loggedUser {
            position: relative;
            padding: .5rem .75rem;
            background: $white;
            margin: 0 auto 0 auto;
            @include for-tablet-landscape-up () {
                margin: .5rem .5rem 1rem 0;
            }
            object-fit: contain;
            cursor: pointer;
            border-radius: 8px;
            span {
                font-size: 1.25rem;
                letter-spacing: 1px;
            }
        }
    }

    .selectionElement {
        display: flex;
        margin: 0 0 .5rem 1rem;
        height: 2rem;

        span {
            margin-left: 2.5rem;
            vertical-align: super;
            font-size: 1.1rem;
            line-height: 1rem;
            font-weight: normal;
            font-style: normal;
        }
    }

    .listElement {
        padding: 0.5rem 1rem;
        border-radius: 12px;
        margin: .5rem 0;
        cursor: pointer;
        transition: $animation-default;

        &:before {
            position: relative;
            top: -2px;
            content: url('../assets/img/arrow.svg');
            width: 1.5rem;
            height: 1.5rem;
            margin-left: 1rem;
            margin-right: 1rem;
            transition: $animation-default;
            opacity: 0;
        }

        &.active {
            font-weight: normal;
            color: $active;
            background: #fff;
            padding-left: 0;

            &:before {
                content: url('../assets/img/arrow.svg');
                width: 1.5rem;
                height: 1.5rem;
                margin-left: 1rem;
                margin-right: 1rem;
                opacity: 1;
            }
        }

        &.disabled {
            color: $c-small-font;
            font-weight: normal;
            padding: 0.5rem 1rem;
            &:before {
                content: '';
                width: 0;
                height: 0;
            }
            background: $c-light-grey;
        }

        li {
            list-style-type: none;
        }



        /* Customize the label (the container) */
        .container {
            display: block;
            position: relative;
            padding-left: 100%;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Hide the browser's default radio button */
        .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom radio button */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #eee;
            border-radius: 50%;
        }

        /* On mouse-over, add a grey background color */
        .container:hover input~.checkmark {
            background-color: #ccc;
        }

        /* When the radio button is checked, add a blue background */
        .container input:checked~.checkmark {
            background-color: #2196F3;
        }

        /* Create the indicator (the dot/circle - hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the indicator (dot/circle) when checked */
        .container input:checked~.checkmark:after {
            display: block;
        }

        /* Style the indicator (dot/circle) */
        .container .checkmark:after {
            top: 9px;
            left: 9px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }
    }
</style>