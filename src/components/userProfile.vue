<template>
    <div class="userProfile--container" @click.self="toggleUserProfile">
        <div class="userProfile--modal">
            <div class="modal--title">
                <h1>Dein Profil</h1>
                <p>
                    Du bist über deine Passnamen eingeloggt. Verwende ihn auch auf deinen anderen Geräten, um deine gespeicherten Kurse einsehen zu können.
                </p>
                <p>
                    Füge diesen Link zu deinen Bookmarks hinzu um immer eingeloggt zu bleiben.
                </p>
                <div class="bookmark-wrapper">
                <div class="bookmark">
                    <span> http://fb4kursplaner.fh-potsdam.de/?id={{currentUserName}}</span>
                </div>
            </div>
            </div>

            <div class="logout--wrapper">
                <button v-if="this.$store.state.user.status != '' && !this.$store.state.user.error" class="button button__medium--warn" @click="logout()">Logout</button>
                <p>Wenn du dich ausloggst wirst du dich <b>nur mit deinem Passnamen</b> wieder einloggen können.</p>
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
            toggleUserProfile() {
                this.$store.state.user.toggleUserProfile = false;
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

    .bookmark-wrapper {
        margin: 1rem 0;

        @include auth-mobile {
            margin: 1.5rem 0;
        }

        .bookmark {
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