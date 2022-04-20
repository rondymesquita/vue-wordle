<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { word, wordIsSelected } from './Word.css.ts';

const props = defineProps({
  size: {
    type: Number,
    default: 5,
  },
  result: {
    type: Object,
    default: {},
  },
  isRevealed: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const letters = computed(() => {
  const lettersFromResult = [];
  for (let i = 0; i < props.size; i++) {
    const value = props.result[i];
    console.log(value);
    if (value) {
      lettersFromResult.push(value);
    } else {
      lettersFromResult.push({
        letter: ' ',
        isCorrect: false,
        isExist: false,
      });
    }
  }

  return lettersFromResult;
});
</script>

<template>
  <section :class="[word, { [wordIsSelected]: props.isSelected }]">
    <Letter
      class="letter"
      v-for="letter in letters"
      :letter="letter.letter"
      :is-correct="letter.isCorrect"
      :is-exist="letter.isExist"
      :is-revealed="props.isRevealed"
    />
  </section>
</template>

<style scoped>
/* .word--selected {
  border: 1px solid red;
} */
section::v-deep .letter:nth-child(2) .letter__content {
  transition-delay: 0.1s;
}
section::v-deep .letter:nth-child(3) .letter__content {
  transition-delay: 0.2s;
}
section::v-deep .letter:nth-child(4) .letter__content {
  transition-delay: 0.3s;
}
section::v-deep .letter:nth-child(5) .letter__content {
  transition-delay: 0.4s;
}
</style>
