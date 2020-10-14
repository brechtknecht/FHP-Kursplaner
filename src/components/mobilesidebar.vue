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
                <option disabled value="">Please select one</option>
                <option>Grundstudium</option>
                <option>Hauptstudium</option>
                <option>Master</option>
            </select>
        </div>
    </div>
</template>

<script>
import {
        mapState
    } from 'vuex'

export default {
    computed: {
            studyType: {
                get() {
                    return this.$store.state.queries.studyType;
                },
                set(studyType) {
                    this.$store.dispatch('SWITCH_STUDY_TYPE', studyType);
                }
            },
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
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