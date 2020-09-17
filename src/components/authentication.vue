<template>
    <div class="authentication--container" @click.self="toggleAuthentication">
        <div class="authentication--modal">
            <div class="modal--title">
                <h1>Anmeldung erforderlich</h1>
                <p>Um dir Kurse merken zu können, musst du dir eine Art Account erstellen. Dafür generieren wir für dich einen Namen, den du dir merken/kopieren musst um beim nächsten Mal weitermachen zu können.</p>
            </div>
            <div class="modal--options">
                <div class="modal--login">
                    <h4>Login</h4>
                    <input v-model="passphrase"/>
                    <button @click="login">Login</button>
                </div>
                <div class="modal--signin">
                    <h4>Generate</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            passphrase: ''
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
        toggleAuthentication () {
            this.$store.state.user.toggleAuth = false;
            console.log("clicked")
        }
    }
}
</script>

<style lang="scss">
    .authentication--container {
        position: absolute;
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
;
    }
</style>