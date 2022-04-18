<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';

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
});

const letters = computed(() => {
  const lettersFromResult = [];
  for (let i = 0; i < props.size; i++) {
    const value = props.result[i];
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
  <section>
    <Letter
      v-for="letter in letters"
      :letter="letter.letter"
      :is-correct="letter.isCorrect"
      :is-exist="letter.isExist"
      :is-revealed="props.isRevealed"
    />
  </section>
</template>

<style scoped>
section {
  display: flex;
  padding: 4px;
  text-transform: uppercase;
}
</style>
