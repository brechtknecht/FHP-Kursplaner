<template>
    <h1 
        ref="target" 
        class="day-toggle regular left-fix"
        :class="{'in-viewport': targetIsVisible}"
    >
        <slot></slot>
    </h1>
  
</template>

<script>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

export default {
    setup() {
    const target = ref(null)
    const targetIsVisible = useElementVisibility(target)

    console.log(targetIsVisible)

    return {
      target,
      targetIsVisible,
    }
  }
}
</script>

<style lang="scss">
    h1 {
        font-weight: normal;
        margin: 0;
    }

    .left-fix {
    position: relative;
    }
    
</style>