<template>
    <div class="authentication--container" @click.self="toggleAuthentication">
        <div class="authentication--modal">
            <div class="modal--title">
                <h1>Anmeldung erforderlich</h1>
                <p>Speichere dir deine ausgewählten Kurse, indem du dir eine Art Account anlegst. Dieser Account besteht nur aus einem einmalig vorkommenden Namen, den wir für dich generieren. Diesen merkst/kopierst du dir, um deine Auswahl beim nächsten Mal fortzusetzen.</p>
            </div>
            <div v-if="generatedPassphrase" class="modal--options">
                <div class="modal--login">
                    <h2>Login</h2>
                    <span v-if="this.$store.state.user.error" class="warning">Keinen Nutzer gefunden.</span>
                    <div class="login">
                        <input class="input input__medium" v-model="passphrase"/>
                        <button class="button button__medium" @click="login">Login</button>
                    </div>
                    <div class="tip">
                        <span>Hier musst du deinen Namen eigeben, den du dir das letzte Mal gemerkt hast, um auf deine Daten zugreifen zu können.</span>
                    </div>
                </div>
                <div class="modal--signin">
                    <h2>Registrieren mit generiertem Namen</h2>
                    <div class="generated">
                        <div class="passphrase--wrapper">
                            <div class="passphrase" @click="copyToClipboard()"> 
                                <span>{{ generatedPassphrase }}</span>
                                <span class="copyToClipboard"> {{ copy.status }}</span>
                            </div>
                            <button class="button button__medium refresh"  @click="generateNewPassphrase()">Neuen Namen generieren</button>
                        </div>
                        <div class="bookmark-wrapper">
                            <div class="bookmark">
                                <span> http://fb4kursplaner.fh-potsdam.de/?id={{generatedPassphrase}}</span>
                            </div>
                            <div class="tip">
                                <span>Dieser Link ist erst aktiviert, wenn du dich mit deinem generierten Namen registriert hast.</span>
                            </div>
                        </div>

                        <button class="button button__medium button__medium--cta register" @click="signIn()">Mit generiertem Namen registrieren</button>
                        <div class="tip">
                            <span>Du meldest dich mit dem oben generierten Namen an. Kopiere ihn dir, um beim nächsten Mal oder auf einem anderen Gerät auf deine Daten zugreifen zu können.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h4>Leider gibt es Probleme mit der Datenbank, versuche es später noch einmal.</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            passphrase: '',
            copy: {
                status: 'In Zwischenablage kopieren'
            },
            error: ''
        }
    },
    mounted() {
        this.$store.dispatch('generatePassphrase')
    },
    computed : {
        generatedPassphrase () {
            return this.$store.state.user.generatedPassphrase
        }
    },
    methods: {
        login() {
            console.log("Login Triggered")
            let userData = {
                passphrase : this.passphrase
            }

            this.$store.state.user.name = userData.passphrase;
    
            this.$store.dispatch('login', userData)
        },
        signIn() {
            this.$store.dispatch('signIn', this.generatedPassphrase)

            this.$store.state.user.name = this.generatedPassphrase;

            // this.copyToClipboard()
        },
        toggleAuthentication () {
            this.$store.state.user.toggleAuth = false;
            console.log("clicked")
        },
        generateNewPassphrase() {
            this.$store.dispatch('generatePassphrase')
            this.copy.status = 'In Zwischenablage kopieren'
        },
        copyToClipboard () {
            var tempInput = document.createElement("input");
            tempInput.value = this.generatedPassphrase;
            document.body.appendChild(tempInput);
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); /*For mobile devices*/
            console.log(tempInput)
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            this.copy.status = "In Zwischenablage kopiert"
        }
    }
}
</script>



<style lang="scss">
    @import '../assets/scss/main.scss';
    .authentication--container {
        position: fixed;
        top: 0; bottom: 0; left: 0; right: 0;
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
    .authentication--modal {
        position: relative;
        top: 50%; bottom: 50%; left: 50%; right: 50%;
        transform: translateX(-50%) translateY(-50%);
        // padding: 2rem 4rem;
        padding: 2rem 4rem 2.5rem 4rem;
        background: #fff;
        width: 60%;
        max-width: 70rem;
        height: auto;
        z-index: 100;
        border-radius: 12px;
        border: 1px solid rgba(218,220,224,1);
        @include for-tablet-portrait-up { 
            width: 100%;
            padding: 0 0 1.5rem 0;
            border: 0;
        }

        .tip {
            text-align: left;
            margin: .5rem 0;
            color: $c-small-font;
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
        .modal--options {
            display: flex;
            flex-direction: row;
            @include auth-mobile {
                flex-direction: column;
            }
            & > div {
                width: 50%;
                &:first-child {
                    padding-right: 2.5rem;
                    @include auth-mobile { 
                        padding: 0 1.5rem;
                        width: 100%;
                        border: 0;        
                        & > div {
                            max-width: 85vw;
                        }
                    }
                }
                &:last-child {
                    padding-left: 2.5rem;
                    @include auth-mobile { 
                        padding: 0 1.5rem;
                        width: 100%;
                        border: 0;
                        & > div {
                            max-width: 85vw;
                        }
                    }
                }
            }



            h2 {
                text-align: left;
            }
        }
        .modal--login {
            border-right: 1px solid $stroke;
            .login {
                display: flex;
            }
            .warning {
                text-align: left;
                color: $warn;
            }
        }
        .modal--signin {
            .generated {
                .passphrase--wrapper {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    @include for-tablet-landscape-up () {
                        flex-direction: row;
                    }
                    .passphrase {
                        padding: .5rem .75rem;
                        background: $c-light-grey;
                        margin: 0 auto 0 auto;
                        @include auth-mobile () {
                            width: calc(100% - .5rem);
                            margin: 0 .5rem .75rem 0;
                        }
                        width: 40ch;
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
                .bookmark-wrapper {
                    margin: 4rem 0;
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
                        text-align: left;
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
                .register {
                    margin: 2rem 0 .5rem 0;
                }
            }
        }
    }
</style>