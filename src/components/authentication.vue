<template>
    <div class="authentication--container" @click.self="toggleAuthentication">
        <div class="authentication--modal">
            <div class="modal--title">
                <h1>Anmeldung erforderlich</h1>
                <p>Um dir Kurse merken zu können, musst du dir eine Art Account erstellen. Dafür generieren wir für dich einen Namen, den du dir merken/kopieren musst um beim nächsten Mal weitermachen zu können.</p>
            </div>
            <div v-if="generatedPassphrase" class="modal--options">
                <div class="modal--login">
                    <h4>Login</h4>
                    <input v-model="passphrase"/>
                    <button @click="login">Login</button>
                </div>
                <div class="modal--signin">
                    <h4>Generate</h4>
                    <div class="generated">
                        <div class="passphrase" @click="copyToClipboard()"> 
                            <span>{{ generatedPassphrase }}</span>
                            <span class="copyToClipboard"> {{ copy.status }}</span>
                        </div>
                        <button class="refresh"  @click="generateNewPassphrase()">Generate new Name</button>
                        <button class="register" @click="signIn()">Anmelden mit Passphrase</button>
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
            }
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

            this.$store.dispatch('login', userData)
        },
        signIn() {
            this.$store.dispatch('signIn', this.generatedPassphrase)
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
    }
    .authentication--modal {
        position: relative;
        top: 50%; bottom: 50%; left: 50%; right: 50%;
        transform: translateX(-50%) translateY(-50%);
        padding: 2rem 4rem;
        background: #fff;
        width: 60%;
        height: 60%;
        z-index: 100;
        border-radius: 8px;
        border: 1px solid rgba(218,220,224,1);
        .modal--options {
            display: flex;
            & > div {
                width: 50%;
            }
        }
        .modal--signin {
            .generated {
                .passphrase {
                    padding: .5rem .75rem;
                    background: $c-light-grey;
                    margin: 1rem auto;
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
        }
    }
</style>