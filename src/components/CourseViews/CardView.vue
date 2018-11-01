<template>
    <div>
        <div class="divider">
            <h3>Montag</h3>
        </div>
        <div class="cards" v-if="courses.courses.length > 0">
            <div class="card" v-for="course in courses.courses" :key="course._id" :style="{'background': 'var(--color-' + course.category + ')'}" :class="course.category">
                <div class="title">{{ course.title }}</div>
                <div class="teacher">{{ course.teacher }}</div>
                <div class="cardBottom">
                    <div class="time">{{ course.day }} {{ course.time }}</div>
                    <div class="moduleId">{{ course.moduleId }}</div>
                    <div class="addToPlan"> <span> + </span> </div>
                </div>
            </div>
        </div>
        <div v-else>
            Keine Daten ausgewählt du spast
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CardView',
        props: {
            courses: Object,
            sort: Object
        }
    }
</script>

<style lang="scss">
    .divider {
        border-bottom: 2px solid #2c3e50;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
        margin: 2.5rem 0;

        .card {
            display: flex;
            flex-direction: column;
            background: #E4E4E3;
            border-radius: 12px;
            padding: 1.8rem 1.5rem;

            .title {
                font-family: 'FHPSun-Bold';
                font-size: 1.2rem;
            }

            .teacher {
                margin-top: 0.2rem;
                font-weight: 600;
            }

            .cardBottom {
                position: relative;
                bottom: 0;
            }

            .addToPlan {
                font-family: 'FHPSun-Bold';
                font-size: 1.5rem;
                text-align: right;
                line-height: 1rem;
                bottom: 1rem;
                right: 1.5rem;
            }
        }
    }
</style>