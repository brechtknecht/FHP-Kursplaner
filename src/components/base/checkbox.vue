<template>
    <div>
        <input class="styled-checkbox" :id="this.$props._id" type="checkbox" :value="this.$props._id" @click="rememberCourse()" >
        <label :for="this.$props._id">{{ label }}</label>
    </div>

</template>

<script>
    export default {
        props: {
            _id: String,
            label: String
        },
        methods: {
            rememberCourse: function () {
                this.$store.commit('USER_ADD_REMEMBERED_COURSE', this.$attrs.id);
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/main.scss';

    .styled-checkbox {
        position: absolute; // take it out of document flow
        opacity: 0; // hide it
        z-index: 200;
        width: 32px;
        height: 32px;

        &+label {
            position: relative;
            cursor: pointer;
            padding: 0;
        }

        // Box.
        &+label:before {
            content: '';
            margin-right: 10px;
            display: inline-block;
            vertical-align: text-top;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: white;
        }

        // Box hover
        &:hover+label:before {
            background: #fff;
        }

        // Box focus
        &:focus+label:before {
            box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
        }

        // Box checked
        &:checked+label:before {
            background: #fff;
        }

        // Disabled state label.
        &:disabled+label {
            color: #b8b8b8;
            cursor: auto;
        }

        // Disabled box.
        &:disabled+label:before {
            box-shadow: none;
            background: #ddd;
        }

        // Checkmark. Could be replaced with an image
        &:checked+label:after {
            content: '';
            position: absolute;
            left: 5px;
            top: 9px;
            background: $active;
            width: 2px;
            height: 2px;
            box-shadow:
                2px 0 0 $active,
                4px 0 0 $active,
                4px -2px 0 $active,
                4px -4px 0 $active,
                4px -6px 0 $active,
                4px -8px 0 $active;
            transform: rotate(45deg);
        }
    }
</style>