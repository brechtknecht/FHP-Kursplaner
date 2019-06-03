<template>
    <div class="sidebar">
        <h2>Lehrangebot</h2>
        <h4>Wochentage</h4>
        <ul>
            <li class="listElement active">Montag</li>
            <li class="listElement">Dienstag</li>
            <li class="listElement">Mittwoch</li>
            <li class="listElement">Donnerstag</li>
            <li class="listElement">Freitag</li>
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
        padding-left: 2.5rem;
        cursor: pointer;
        &.active {
            font-weight: 900;
            background: #fff;
            padding-left: 0;
            &:before {
                content: url('../assets/img/arrow.svg');
                width: 1.5rem;
                height: 1.5rem;
                margin-left: 1rem;
                margin-right: 1rem;
            }
        }
        li {
            list-style-type: none;
        }
    }
</style>

