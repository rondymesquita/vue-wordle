<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import * as style from './Keyboard.css.ts';

const props = defineProps({
  usedLettersResult: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(['onLetterClick', 'onEnterClick', 'onDelClick']);

const keys = ref([
  { letter: 'q', isExist: true, isCorrect: false },
  { letter: 'w', isExist: false, isCorrect: true },
  { letter: 'e', isExist: true, isCorrect: true },
  { letter: 'r', isExist: false, isCorrect: false },
  { letter: 't', isExist: false, isCorrect: false },
  { letter: 'y', isExist: false, isCorrect: false },
  { letter: 'u', isExist: false, isCorrect: false },
  { letter: 'i', isExist: false, isCorrect: false },
  { letter: 'o', isExist: false, isCorrect: false },
  { letter: 'p', isExist: false, isCorrect: false },
  { letter: 'a', isExist: false, isCorrect: false },
  { letter: 's', isExist: false, isCorrect: false },
  { letter: 'd', isExist: false, isCorrect: false },
  { letter: 'f', isExist: false, isCorrect: false },
  { letter: 'g', isExist: false, isCorrect: false },
  { letter: 'h', isExist: false, isCorrect: false },
  { letter: 'j', isExist: false, isCorrect: false },
  { letter: 'k', isExist: false, isCorrect: false },
  { letter: 'l', isExist: false, isCorrect: false },
  { letter: '[del]', isExist: false, isCorrect: false },
  { letter: 'z', isExist: false, isCorrect: false },
  { letter: 'x', isExist: false, isCorrect: false },
  { letter: 'c', isExist: false, isCorrect: false },
  { letter: 'v', isExist: false, isCorrect: false },
  { letter: 'b', isExist: false, isCorrect: false },
  { letter: 'n', isExist: false, isCorrect: false },
  { letter: 'm', isExist: false, isCorrect: false },
  { letter: '[enter]', isExist: false, isCorrect: false },
]);

const line1 = computed(() => {
  return keys.value.slice(0, 10);
});
const line2 = computed(() => {
  return keys.value.slice(10, 20);
});
const line3 = computed(() => {
  return keys.value.slice(20, 28);
});

watch(
  () => props.usedLettersResult,
  (usedLettersResult: Array<any>) => {
    console.log('changed', usedLettersResult);

    usedLettersResult.forEach((usedLetter) => {
      const index = keys.value.findIndex((key) => {
        return key.letter === usedLetter.letter;
      });
      console.log(index);
      keys.value.splice(index, 1, { ...usedLetter, isRevealed: true });
    });
  }
);

const onKeyClick = (letter: string) => {
  if (letter === '[enter]') {
    emit('onEnterClick');
  } else if (letter === '[del]') {
    emit('onDelClick');
  } else {
    emit('onLetterClick', letter.toLowerCase());
  }
};
</script>

<template>
  <div :class="style.keyboard">
    <div :class="style.line">
      <Key
        v-for="letter in line1"
        @click="onKeyClick(letter.letter)"
        :value="letter.letter"
        :is-present="letter.isExist"
        :is-correct="letter.isCorrect"
        :is-revealed="letter.isRevealed"
      ></Key>
    </div>
    <div :class="style.line">
      <Key
        v-for="letter in line2"
        @click="onKeyClick(letter.letter)"
        :value="letter.letter"
        :is-present="letter.isExist"
        :is-correct="letter.isCorrect"
        :is-revealed="letter.isRevealed"
      ></Key>
    </div>
    <div :class="style.line">
      <Key
        v-for="letter in line3"
        @click="onKeyClick(letter.letter)"
        :value="letter.letter"
        :is-present="letter.isExist"
        :is-correct="letter.isCorrect"
        :is-revealed="letter.isRevealed"
      ></Key>
    </div>
  </div>
</template>

<style scoped></style>
