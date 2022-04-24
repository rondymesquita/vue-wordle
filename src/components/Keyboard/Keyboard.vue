<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Result } from '../../types';
/* @ts-ignore */
import * as style from './Keyboard.css.ts';

// interface Props {
//   usedLettersResult: Array<Result>;
// }

// const props = defineProps({
//   usedLettersResult: {
//     type: Array,
//     default: [],
//   },
// });

const createDefaultKeyboard = () => {
  return [
    { letter: 'q', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'w', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'e', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'r', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 't', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'y', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'u', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'i', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'o', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'p', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'a', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 's', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'd', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'f', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'g', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'h', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'j', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'k', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'l', isExist: false, isCorrect: false, isRevealed: false },
    { letter: '[del]', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'z', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'x', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'c', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'v', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'b', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'n', isExist: false, isCorrect: false, isRevealed: false },
    { letter: 'm', isExist: false, isCorrect: false, isRevealed: false },
    { letter: '[enter]', isExist: false, isCorrect: false, isRevealed: false },
  ];
};

const emit = defineEmits(['onLetter', 'onEnter', 'onDel']);

const keys = ref<Array<Result>>(createDefaultKeyboard());

const line1 = computed(() => {
  return keys.value.slice(0, 10);
});
const line2 = computed(() => {
  return keys.value.slice(10, 20);
});
const line3 = computed(() => {
  return keys.value.slice(20, 28);
});

const setLettersState = (usedLettersResult: Array<Result>) => {
  usedLettersResult.forEach((usedLetter) => {
    const index = keys.value.findIndex((key) => {
      return key.letter === usedLetter.letter;
    });
    // console.log(index, usedLettersResult);
    keys.value.splice(index, 1, { ...usedLetter, isRevealed: true });
  });
};

const reset = () => {
  keys.value = createDefaultKeyboard();
};

defineExpose({
  setLettersState,
  reset,
});

const onKeyClick = (letter: string) => {
  if (letter === '[enter]') {
    emit('onEnter');
  } else if (letter === '[del]') {
    emit('onDel');
  } else {
    emit('onLetter', letter.toLowerCase());
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
