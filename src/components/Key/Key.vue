<script setup lang="ts">
import { ref, computed } from 'vue';
import * as style from './Key.css.ts';

const props = defineProps({
  value: {
    type: String,
    default: '{}',
  },
  isPresent: {
    type: Boolean,
    default: false,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  isRevealed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <span
    :class="[
      style.key.default,
      {
        [style.key.isPresent]: props.isPresent && props.isRevealed,
        [style.key.isMissing]: !props.isPresent && props.isRevealed,
        [style.key.isCorrect]: props.isCorrect && props.isRevealed,
      },
    ]"
  >
    {{ value }}
  </span>
</template>

<style scoped></style>
