<template>
    <div class="version-wrapper">
        <div class="version">
            Daten zuletzt aktualisiert: {{ this.coursesStash.data.data['date-scraped'] }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed : {
        ...mapState([
            'coursesStash'
        ])
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/main.scss';
    .version-wrapper {
        position: fixed;
        z-index: 90;
        bottom: 0;
        right: 50%;
        .version {
            font-family: "FHPSun-Regular";
            position: relative;
            cursor: pointer;
            left: 50%;
            right: 50%;
            background: $white;
            color: $active;
            width: 20rem;
            margin: 1rem 2rem;
            padding: .75rem 1.5rem;
            border-radius: 4px;
        }
    }

</style>