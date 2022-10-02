<template>
    <div class="support--container" @click.self="toggleSupport">
        <div class="support--modal">
            <div class="modal--title">
                <h1>Support & Feedback</h1>
                <p>
                    Der Kursplaner ist ein Projekt des Fachbereichs Design der Fachhochschule Potsdam. 
                </p>
                <p>
                    Design und Entwicklung: Felix Tesche. Unterstützung bei technischen Problemen:
                </p>
                <div class="reachout-wrapper">
                    <a href="https://twitter.com/mrfesch" target="_blank">
                        <div class="reachout">
                            <span> Twitter (@mrfesch) </span>
                        </div>
                    </a>
                    <div class="divider"></div>
                    <a href="mailto:felix.tesche@gmail.com?subject=Kursplaner Support" target="_blank">
                        <div class="reachout">
                            <span> E-Mail senden </span>
                        </div>
                    </a>
                </div>
                <p>Bei Fragen zur Studienordnung: E-Mail (dekanat-fb4@fh-potsdam.de)</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            currentUserName () {
                return this.$store.state.user.name
            }
        },
        methods: {
            toggleSupport() {
                this.$store.state.user.toggleSupport = false;
                console.log("Close User Profile Screen")
            },
            logout () {
                this.$store.dispatch('logout')
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/main.scss';

    .support--container {
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

    .support--modal {
        position: relative;
        top: 50%;
        bottom: 50%;
        left: 50%;
        right: 50%;
        transform: translateX(-50%) translateY(-50%);
        // padding: 2rem 4rem;
        padding: 2rem 2.5rem 2rem 2.5rem;
        background: #fff;
        width: 30%;
        max-width: 70rem;
        height: auto;
        z-index: 100;
        border-radius: 12px;
        border: 1px solid rgba(218, 220, 224, 1);

        @include for-tablet-portrait-up {
            width: 100%;
            padding: 0 0 1.5rem 0;
            border: 0;
        }
    }

    .modal--title {
        padding: 0 0 1rem 0;
        text-align: left;
        @include for-tablet-portrait-up () {
            padding: 0 1.5rem;
        } 
        p {
            font-size: 1.15rem;
            line-height: 1.6rem;
            max-width: 75ch;
            text-align: left;
            margin-right: 0.25rem;
        }
    }

    .logout--wrapper {
        padding: 6rem 0 0 0;
        p {
            font-size: 1.15rem;
            line-height: 1.6rem;
            max-width: 75ch;
            text-align: center;
        }
    }

    .reachout-wrapper {
        margin: 1rem 0;
        display: grid;
        grid-template-columns: 1fr 0.5rem 1fr;
        gap: 0.5rem;

        @include auth-mobile {
            margin: 1.5rem 0;
        }

        a {
            text-decoration: none;
            color: #000;
        }

        .reachout {
            padding: .5rem .75rem;
            background: $c-light-grey;
            margin: 0 auto 0 auto;

            @include for-tablet-landscape-up () {
                margin: 0 .5rem 0 0;
            }

            width: 95%;
            cursor: pointer;
            border-radius: 8px;

            span {
                font-size: 1.25rem;
                letter-spacing: 1px;
            }
            border: 2px solid transparent;

            &:hover {
                border: 2px solid $active;
            }

            .copyToClipboard {
                content: 'In Zwischenablage kopieren';
                display: block;
                font-size: .9rem;
                letter-spacing: 0.01rem;
                margin: .25rem 0 0 0;
            }
        }
    }
</style>