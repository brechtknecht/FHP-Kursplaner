<template>
    <div class="sidebar">
        <h2>Lehrangebot</h2>
        <h4>Wochentage</h4>
        <ul>
            <li class="listElement Montag" :class="{ active: monday }" @click="scrollToDay">Montag</li>
            <li class="listElement Dienstag" :class="{ active: tuesday }" @click="scrollToDay">Dienstag</li>
            <li class="listElement Mittwoch" :class="{ active: wednesday }" @click="scrollToDay">Mittwoch</li>
            <li class="listElement Donnerstag" :class="{ active: thursday }" @click="scrollToDay">Donnerstag</li>
            <li class="listElement Freitag" :class="{ active: friday }" @click="scrollToDay">Freitag</li>
        </ul>
        <input type="radio" id="mc" name="Vorgemerkte Kurse" value="selectedCourses">
        <label>Vorgemerkte Kurse</label>
        <hr>
        <h4>Anzeigen</h4>
        <div class="studySelection">       
                <div class="selectionElement">
                    <input type="radio" name="studyType"  value="Grundstudium" v-model="studyType" >
                    <label>Grundstudium</label>
                </div>
                <div class="selectionElement">
                    <input type="radio"  name="studyType" value="Hauptstudium" v-model="studyType">
                    <label>Hauptstudium</label>
                </div>
                <div class="selectionElement">
                    <input type="radio"  name="studyType" value="Master" v-model="studyType">
                    <label>Masterstudium</label>
                </div>
        </div>
        <hr>
        <h4>Sortieren nach:</h4>
        <div class="courseFilters">
            <div class="selectionElement">
                <input type="radio" id="mc" name="Kursnummer" value="courseId">
                <label>Kursnummer</label>
            </div>
            <div class="selectionElement">
                <input type="radio" id="mc" name="Kurszeit" value="courseTime">
                <label>Kurszeit</label>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {    
        name: 'Sidebar',
        computed: {
            studyType : {
                get () {
                    return this.$store.state.queries.studyType;
                },
                set (studyType) {
                    this.$store.dispatch('SWITCH_STUDY_TYPE', studyType);
                }
            },
            activeDays: function () {
                return Object.values(this.view.activeDays);
            },
            monday : function () { for (let day of this.activeDays) { if(day == "Montag") { return true; }}},
            tuesday : function () { for (let day of this.activeDays) { if(day == "Dienstag") { return true; }}},
            wednesday : function () { for (let day of this.activeDays) { if(day == "Mittwoch") { return true; }}},
            thursday : function () { for (let day of this.activeDays) { if(day == "Donnerstag") { return true; }}},
            friday : function () { for (let day of this.activeDays) { if(day == "Freitag") { return true; }}},
            
            ...mapState([
                'view'
            ])
        },
        methods: {
            scrollToDay : function (e) {
                let ref = e.target.classList[1];
                let element  = document.getElementsByClassName(ref).item(1);

                element.scrollIntoView({block: "end", behavior: "smooth"});
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

    .sidebar {
        position: fixed;
        width: 15rem;
        height: 100vh;
        padding: 2.5rem 1.5rem;
        z-index: 400;
        text-align: left;
        background: $c-light-grey;
    }

    .selectionElement {
        display: flex;
        label {
            margin-left: .5rem;
        }
    }

    .listElement {
        padding: 0.5rem 1rem;
        border-radius: 12px;
        margin: .5rem 0;
        cursor: pointer;
        transition: $animation-default;
        &:before {
            content: url('../assets/img/arrow.svg');
            width: 1.5rem;
            height: 1.5rem;
            margin-left: 1rem;
            margin-right: 1rem;
            transition: $animation-default;
            opacity: 0;
        }
        &.active {
            font-weight: 800;
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
        li {
            list-style-type: none;
        }
    }
</style>

