<template>
    <div class="course" :style="{'grid-column' : column}">
        <div class="course--checkbox">
            <input type="checkbox">
        </div>
        <div class="course--info">
            <h3> {{ this.$props.info.module.category }}—{{ this.$props.info.module.name }}:  {{ this.$props.info.title }} </h3>
            <h4> {{ this.$props.info.techer }} {{ this.$props.info.module.id }}</h4>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Course',
    props: {
        position: { row: String, start: String, end: String },
        info:     { title: String, teacher: String, module: { id: String, name: String, category: String }}
    },
    computed: {
        /* Sets the correct column based on the position prop */ 
      column () {
        let start = this.$props.position.start;
        let end   = this.$props.position.end;
        let range_start = 8; let range_end  = 20; 

        let range_start_grid = parseInt(this.convertRange(start , range_start, range_end, 0, 52) - 2);
        let range_end_grid   = parseInt(this.convertRange(end   , range_start, range_end, 0, 52)) - range_start_grid - 4;

    
        return range_start_grid + ' / span ' +  range_end_grid;
      }
    },
    methods: {
      // Method that generates the position based on the time-range
      convertRange(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }
    }
  }
</script>

<style lang="scss">
    @import '@/assets/scss/main.scss';

    .course {
        height: 100%;
        width: 100%;
        border-radius: 2rem;
        background: $c-TH;
        padding: .5rem 2rem;
        display: flex;
        .course--checkbox {
            display: flex;
            align-items: center;
            & input[type="checkbox"]{
                transform: scale(1.5);
                border-radius: 4px;
            }
        }
        .course--info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 1.5rem;
        }
        h4 {
            margin-top: .5rem
        }
    }
</style>