<template>
    <label :for="this.$props._id" class="container">
        <input type="checkbox" :id="this.$props.id" :value="this.$props.id" @click="rememberCourse()"
            :class="[{checked : isChecked}, this.$props.id]">
        <span class="checkmark">{{ label }}</span>
    </label>
</template>

<script>
    export default {
        props: {
            id: String,
            label: String,
            isClickable: Boolean
        },
        mounted() {
            // Fix for the case if the checbox is not loaded yet
            this.setCheckboxes(this.isChecked);
        },
        computed: {
            isChecked() {
                let rememberedCoursesRef = this.$store.state.user.rememberedCourses;
                if (typeof rememberedCoursesRef == 'undefined') {
                    return false
                }

                if (rememberedCoursesRef.includes(this.$props.id)) {
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
            setCheckboxes(isChecked) {
                let activeCheckboxes = document.getElementsByClassName(this.$props.id);
                for (let item of activeCheckboxes) {
                    item.checked = isChecked;
                }
            },
            rememberCourse: function () {
                if (this.isClickable) {
                    this.$store.commit('USER_ADD_REMEMBERED_COURSE', this.id);
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/main.scss';

    /* Customize the label (the container) */
    .container {
        display: inline-block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 24px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #fff;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input~.checkmark {}

    /* When the checkbox is checked, add a blue background */
    .container input:checked~.checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked~.checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        content: '';
        width: 100%;
        height: 100%;
        margin-top: -4px;
        margin-left: -4px;
        background: white;
        border-radius: 50%;
        background-image: url('../../assets/img/checkmark.svg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 60%;
    }
</style>