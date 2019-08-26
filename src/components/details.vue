<template>
    <div class="details-container"  v-bind:class="{ closingModal: isActive}" @click.self="triggerDetails">
        <div class="detailsWrapper" v-bind:class="{ active: isActive }"> 
            <div class="header" :style="componentStyle">
                <button class="btn" @click="triggerDetails()" >Schließen</button>
                 <label>
                      <input type="checkbox" name="zutat" value="sardellen">
                        merken
                </label>
                <hr>
                <h1> {{ currentCourse.title }} </h1>
                <h4> {{ currentCourse.module.id }} — {{ currentCourse.subtitle }} </h4>
                <ul>
                    <li>  {{ currentCourse.teacher }} </li>
                    <li>  {{ currentCourse.time.fixture.begin.String }} </li>
                    <li>  Raum: {{ currentCourse.room }} </li>
                    <li>  Credits: {{ currentCourse.credits }} </li>
                </ul>
                <button class="btn workspace">Zum Workspace</button>
            </div>
            <div class="content">        
                <h4>Kursbeschreibung</h4>
                <p> {{ currentCourse.description }}</p>
            </div>
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
        componentStyle() {
            // Checks if a color is refered in the modules json in the store.js file
            let colorMode = this.currentCourse.colorCode ? this.lightOrDark(this.currentCourse.colorCode) : 'light'
            let color = colorMode == 'light' ? color = '#3D4043' : color = '#fff' 

            return {
                'background': this.currentCourse.colorCode,
                'color': color
            }
        },
        ...mapState([
            'currentCourse'
        ])
    },
    methods: {
        triggerDetails: function (e) {
            this.$store.commit('VIEW_DETAILS_SELECTED', false);
            this.$emit('CURRENT_COURSE_TRIGGERED');
        },
        lightOrDark: function (color) {
            // Variables for red, green, blue values
            var r, g, b, hsp;

            // Check the format of the color, HEX or RGB?
            if (color.match(/^rgb/)) {

                // If HEX --> store the red, green, blue values in separate variables
                color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
                
                r = color[1];
                g = color[2];
                b = color[3];
            } 
            else {
                
                // If RGB --> Convert it to HEX: http://gist.github.com/983661
                color = +("0x" + color.slice(1).replace( 
                color.length < 5 && /./g, '$&$&'));

                r = color >> 16;
                g = color >> 8 & 255;
                b = color & 255;
            }
            
            // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
            hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
            );

            // Using the HSP value, determine whether the color is light or dark
            if (hsp > 170) {

                return 'light';
            } 
            else {

                return 'dark';
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
    @import '../assets/scss/main.scss';

    .btn {
        width: 200px;
        height: 2rem;
        top: 200px;
        background: $c-light-grey;
        border: 2px solid $c-font;
        border-radius: 3rem;
        &.workspace {
            position: absolute;
            height: 4rem;
            top: calc(100% - 2rem);
        }
    }

    .header, .content {
        padding: 0 1.5rem 0 1.5rem;
    }

    .header {
        position: relative;
        padding-top: 3rem;
        padding-bottom: 3rem;
        ul > li {
            line-height: 1.5rem;
        }
    }

    .content {
        margin-top: 3rem;
        padding-bottom: 2rem;
        overflow-y: scroll;
        max-height: 35rem;
        h4 {
            font-weight: 700;
        }
        p {
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }
    .details-container {
        &.closingModal {
            position: fixed;
            width: calc(100vw -  30rem);
            left: 0;
            height: 100vh;
            z-index: 100;
        }
    }
    .detailsWrapper {
        position: fixed;
        height: 100vh;
        width: 0;
        padding: 0 0 2.5rem 0;
        z-index: 200;
        max-height: 100vh;
        overflow: none;
        right: -40rem;
        width: 30rem;
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


