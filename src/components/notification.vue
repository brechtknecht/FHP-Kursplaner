<template>
    <div class="notification-wrapper">
        <div v-if="notification.message" class="notification">
            {{ notification.message }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed : {
        something () {
            return true;
        },
        ...mapState([
            'notification'
        ])
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/main.scss';
    .notification-wrapper {
        position: fixed;
        z-index: 90;
        bottom: 0;
        left: 0;
        right: 0;
        .notification {
            position: relative;
            left: 50%;
            right: 50%;
            background: $active;
            color: #fff;
            width: 20rem;
            margin: 1rem 2rem;
            padding: .75rem 1.5rem;
            border-radius: 2rem;
        }
    }

</style>