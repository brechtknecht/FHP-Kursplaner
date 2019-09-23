<template>
    <div class="checkbox">
        <input 
            type="checkbox"
            :id="this.$props.id"
            :value="this.$props.id"
            @click="rememberCourse()"
            :class="[{checked : isChecked}, this.$props.id]">
        <label :for="this.$props._id">{{ label }}</label>
    </div>

</template>

<script>
    export default {
        props: {
            id: String,
            label: String,
            isClickable: Boolean
        },
        mounted () {
            // Fix for the case if the checbox is not loaded yet
            this.setCheckboxes(this.isChecked);
        },
        computed : {
            isChecked () {
                let rememberedCoursesRef = this.$store.state.user.rememberedCourses;
                if(typeof rememberedCoursesRef == 'undefined') { return false }

                if(rememberedCoursesRef.includes(this.$props.id)) {
                    this.setCheckboxes(true);
                    return true;
                } else {
                    this.setCheckboxes(false);
                    return false;
                }
                this.triggerButtons();
            }
        },
        methods: {
            setCheckboxes (isChecked) {
                let activeCheckboxes = document.getElementsByClassName(this.$props.id);
                for (let item of activeCheckboxes) {
                    item.checked = isChecked;
                }
            },
            rememberCourse: function () {
                if(this.isClickable) {
                    this.$store.commit('USER_ADD_REMEMBERED_COURSE', this.id);
                }
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
            left: 10px;
            top: 15px;
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