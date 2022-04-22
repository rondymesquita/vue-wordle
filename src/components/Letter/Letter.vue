<script setup lang="ts">

import * as style from './Letter.css.ts'

const props = defineProps({
  letter: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  isExist: {
    type: Boolean,
    default: false,
  },
  isRevealed: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  isHighlighted: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    :class="[style.letter]"
  >
    <div :class="[style.letterContent.default, {
      [style.letterContent.selected]: props.isSelected && !props.isHighlighted,
      [style.letterContent.highlighted]: props.isSelected && props.isHighlighted,
      [style.letterContent.correct]: props.isCorrect,
      [style.letterContent.exists]: props.isExist,
      [style.letterContent.revealed]: props.isRevealed && !props.isCorrect && !props.isExist,
    }]">
      <div :class="[style.letterFront]">
        {{ letter }}
      </div>
      <div :class="[style.letterBack]">
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
