<template>
    <div class="details-container">
        <div class="detailsWrapper" v-bind:class="{ active: isActive }"> 
            
            <button class="btn" @click="triggerDetails" >close den affen</button>
            
            <h1>{{ currentCourse.title }}</h1>
            <p> {{ currentCourse.description }}</p>

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed : {
        isActive () {
            return this.$attrs.isActive;
        },
        ...mapState([
        'currentCourse'
        ])
    },
    methods: {
        triggerDetails: function (e) {
            this.$emit('CURRENT_COURSE_TRIGGERED');
        } 
    }
    
}
</script>
<style lang="scss" scoped>
    @import '../assets/scss/main.scss';

    .btn {
        width: 200px;
        height: 20px;
        top: 200px;
    }

    .detailsWrapper {
        position: fixed;
        height: 100vh;
        width: 0;
        padding: 2.5rem 1.5rem;
        z-index: 100;
        max-height: 100vh;
        overflow: none;
        right: -70rem;
        width: 60rem;
        text-align: left;
        background: $white;
        transition: $animation-default;
        -webkit-box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        -moz-box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        box-shadow: -8px 0px 38px -7px rgba(0,0,0,0.15);
        &.active {
            right: 0;
        }
    }
</style>


