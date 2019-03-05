<template>
    <VoerroTagsInput element-id="tags" class="search" v-model="selectedTags" :existing-tags="existingTags"
        :typeahead="true"></VoerroTagsInput>
</template>

<script>
    import axios from 'axios';
    import VoerroTagsInput from '@voerro/vue-tagsinput';

    export default {
        name: 'Search',
        components: {
            VoerroTagsInput
        },
        props: {

        },
        data() {
            return {
                selectedTags: '',
                existingTags: {}
            }
        },
        mounted() {
            axios
                .get("http://localhost:3000/courses/meta/category")
                .then((res, req, next) => {
                    res.data.forEach(element => {
                        this.existingTags[element + '-category'] = element;
                    });
                });
        }
    }
</script>

<style lang="scss">
    input {
        font-size: 1rem;
        font-family: 'FHPSun-Regular';
    }

    .search {
        position: relative;
    }

    .badge {
        padding: .5rem .7rem;
        border-radius: 24px;
        background: var(--color-Produktdesign);
    }

    .tags-input {
        float: right;
        border-bottom: 1px solid #000;

        input {
            height: 3rem;
            outline: 0;
        }
    }

    .typeahead {
        position: absolute;
        top: 110%;
        left: 50%;
        width: 47.5%;
        background: #fff;
        margin: 0;
        padding: 1.2rem 0.5rem;
        border-radius: 3px;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.38)
    }
</style>