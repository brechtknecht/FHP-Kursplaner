<template>
    <div class="version-wrapper">
        <div v-if="this.coursesStash.data" class="version">
            Daten zuletzt aktualisiert am {{ this.coursesStash.data.data['date-scraped'] }}
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
        z-index: 89;
        bottom: 0;
        right: calc(0% + 14.5rem);
        .version {
            font-family: "FHPSun-Regular";
            position: relative;
            cursor: pointer;
            left: 50%;
            right: 100%;
            background: $white;
            color: $active;
            width: 24rem;
            margin: 1rem 2rem;
            padding: .75rem 1.5rem;
            border-radius: 4px;
            border: 0.5px solid $stroke;
        }
    }

</style>