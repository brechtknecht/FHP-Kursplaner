<template>
    <div class="userProfile--container" @click.self="toggleUserProfile">
        <div class="userProfile--modal">
            <div class="modal--title">
                <h1>Anmeldung erforderlich</h1>
                <p>Speichere Dir Deine ausgewählten Kurse, indem Du Dir eine Art Account anlegst. Dieser Account besteht
                    nur aus einem einmalig vorkommenden Name, den wir für Dich generieren. Diesen merkst/kopierst Du
                    Dir, um Deine Auswahl beim nächsten Mal fortzusetzen.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods : {
            toggleUserProfile () {
                this.$store.state.user.toggleUserProfile = false;
                console.log("Close User Profile Screen")
            },
        } 
    }
</script>

<style lang="scss">
    @import '../assets/scss/main.scss';

    .userProfile--container {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(0, 0, 0, .15);

        @include for-tablet-portrait-up () {
            overflow-y: scroll;
            overflow-x: hidden;
            background: #fff;
        }
    }

    .userProfile--modal {
        position: relative;
        top: 50%;
        bottom: 50%;
        left: 50%;
        right: 50%;
        transform: translateX(-50%) translateY(-50%);
        // padding: 2rem 4rem;
        padding: 2rem 4rem 2.5rem 4rem;
        background: #fff;
        width: 60%;
        max-width: 70rem;
        height: auto;
        z-index: 100;
        border-radius: 8px;
        border: 1px solid rgba(218, 220, 224, 1);

        @include for-tablet-portrait-up {
            width: 100%;
            padding: 0 0 1.5rem 0;
            border: 0;
        }
    }
</style>