<template>
    <div class="mobile--sidebar mobile">
        <div class="header">
            <h2>
                <b>Fachbereich Design</b> </br>
                Lehrangebot
            </h2>
        </div>
        <div class="course--selection">
            <h3>Studienordnung auswählen</h3>
            <select v-model="studyType">
                <option disabled value="">Studienordnung auswählen</option>
                <option>Grundstudium</option>
                <option>Hauptstudium</option>
                <option>Master</option>
                <option disabled value="">Anmeldung erforderlich</option>
                <option value="selectedCourses">Ausgewählte Kurse</option>
            </select>
        </div>
    </div>
</template>

<script>
import {
        mapState
    } from 'vuex'

export default {
    mounted: function () {
        let coursecanvas = document.getElementsByClassName('course-canvas')
        coursecanvas[0].addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
        let coursecanvas = document.querySelectorAll('.course-canvas')
        coursecanvas[0].removeEventListener('scroll', this.handleScroll);
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
    },
    data () {
        return {
        triggers: {
            disable: 200,
            enable: 10
        },
        lastScrollPos: window.scrollY
        }
    },
    methods : {
        handleScroll: function (event) {
            let coursecanvas = document.querySelectorAll('.course-canvas')
            let current = coursecanvas[0].scrollTop;
            if(current > this.lastScrollPos + this.triggers.disable) {             
                document.querySelector('.header').classList.add('mobile--sidebar--collapsed');
                this.lastScrollPos = current;
                this.$store.commit('ENABLE_NAVBAR')
            }
            else if (current < this.lastScrollPos - this.triggers.enable){
                document.querySelector('.header').classList.remove('mobile--sidebar--collapsed');
                this.lastScrollPos = current;
                this.$store.commit('DISABLE_NAVBAR')
            }
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.mobile--sidebar {
    transition: 250ms ease-out;
    &--collapsed {
        transform: translateY(-100%)
    }
}

.course--selection{
    position: fixed;
    bottom: 0;
    display: flex;
    padding: 1rem;
    text-align: left;
    border-top: 1px solid #DADCE0;
    flex-direction: column;
    z-index: 100;
    background: white;
    width: 95%;
    h3 {
        margin: 0 0 .75rem 0;
    }
    select {
        padding: .5rem 1rem;
        appearance: none;
        // Additional resets for further consistency
        background-color: transparent;
        border: none;
        padding: 0.25rem 1rem 0.25rem .2rem;
        margin: 0;
        width: calc(100% - 1rem);
        font-family: inherit;
        border: 2px solid #DADCE0;
        border-radius: 4px;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
        &:after {
            content: "";
            width: 0.8em;
            height: 0.5em;
            background-color: red;
            clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        }
    }
}

</style>