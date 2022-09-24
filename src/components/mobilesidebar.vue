<template>
    <div class="mobile--sidebar mobile">
        <div class="header">
            <div class="wrap">
                <div class="logo">
                    <h2>
                        <b>Fachbereich Design</b><br>
                        Lehrangebot
                    </h2>
                </div>
                <div class="auth">
                    <button v-if="this.$store.state.user.status != '' && !this.$store.state.user.error" class="button button__medium" @click="logout()">Logout</button>
                    <button v-else class="button button__medium" @click="login()">Anmelden</button>
                </div>
            </div>
            <div class="logged--user">
                <div v-if="this.$store.state.user.status != '' && !this.$store.state.user.error" class="user">
                    <span>Angemeldet mit Name <b>{{ this.$store.state.user.name }}</b></span>
                </div>
            </div>
        </div>
        
        <div class="course--selection">
            <h3>Studienordnung auswählen</h3>
            <select v-model="studyType">
                <option disabled value="">Studienabschnitt auswählen</option>
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
        handleScroll: function () {
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
        login() {
            this.$store.commit('CHECK_AUTH')
        },
        logout () {
            this.$store.dispatch('logout')
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';


.wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logged--user {
    position: absolute;
    top: 5.9rem;
    left: 0;
    padding-left: 1rem;
    background: white;
    width: 100vw;
}

.mobile--sidebar {
    transition: 250ms ease-out;
    &--collapsed {
        transform: translateY(-100%);
        .logged--user {
            transform: translateY(-100%);
            opacity: 0;
        }
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