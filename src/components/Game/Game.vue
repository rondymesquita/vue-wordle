<script setup lang="ts">
import { ref, computed } from 'vue';
import { calculate, sanitize } from '../../functions';
import { getWord } from '../../words';
/* @ts-ignore */
import * as style from './Game.css.ts';
import { Result } from '../../types';

const props = defineProps({
  letter: {
    type: String,
    default: '',
  },
});

const MAX_ATTEMPTS = 6;
const MAX_COLUMN_SIZE = 5;
const MAX_ROW_SIZE = 6;

const createEmptyBoard = () => {
  const createEmptyResult = (): Result => {
    return {
      letter: '',
      isCorrect: false,
      isExist: false,
    };
  };
  return Array(MAX_ROW_SIZE)
    .fill(1)
    .map(() =>
      Array(MAX_COLUMN_SIZE)
        .fill(1)
        .map(() => createEmptyResult())
    );
};

let usedLetters: Array<Result> = [];

const typedTerm = ref('');
const secretTerm = ref(getWord());
// const secretTerm = ref('sócio');
const sanitizedSecretTerm = ref(sanitize(secretTerm.value));
const results = ref<Array<Array<Result>>>(createEmptyBoard());
const attemptNumber = ref(MAX_ATTEMPTS);
const currentRow = ref(0);
const currentColumn = ref(0);
const keyboard = ref();

const sendKey = (key: string) => {
  if (key === '[del]') {
    removeLetter();
  } else if (key === '[enter]') {
    processTerm();
  } else {
    addLetter(key);
  }
};

defineExpose({
  sendKey,
});

const reset = () => {
  results.value = createEmptyBoard();
  attemptNumber.value = MAX_ATTEMPTS;
  currentRow.value = 0;
  currentColumn.value = 0;
  secretTerm.value = getWord();
  typedTerm.value = '';
  keyboard.value.reset();
  usedLetters = [];
};

const removeLetter = () => {
  // console.log('currentColumn.value', currentColumn.value);
  // if (currentColumn.value === 0) {
  //   return;
  // }
  const position = results.value[currentRow.value];
  // if (position[currentColumn.value]) {
  position.splice(currentColumn.value, 1, { letter: '' });
  // } else if (position[currentColumn.value - 1]) {
  //   position.pop();
  // }

  if (currentColumn.value > 0) currentColumn.value -= 1;
  console.log('currentColumn.value', currentColumn.value);
};

const addLetter = (letter: string) => {
  // if (isWordComplete.value) {
  //   return;
  // }

  const position = results.value[currentRow.value];

  // if (position[currentColumn.value]) {
  position.splice(currentColumn.value, 1, { letter });
  // } else {
  //   // position.push({ letter });
  // }
  if (currentColumn.value < 4) currentColumn.value += 1;
  console.log('currentColumn.value', currentColumn.value);
};

const calculateUsedLetters = () => {
  const removeEmptyLetters = (result: Result) => !!result.letter;

  const flatResult = results.value
    .flatMap((r: any) => r)
    .filter(removeEmptyLetters);

  flatResult.forEach((result: Result) => {
    const usedResultIndex = usedLetters.findIndex(
      (usedLetterResult: Result) => usedLetterResult.letter === result.letter
    );
    const resultExist = usedResultIndex !== -1;
    if (!resultExist) {
      usedLetters.push(result);
    } else {
      const newValue = result;
      const shouldReplace = newValue.isCorrect;
      if (shouldReplace) {
        usedLetters.splice(usedResultIndex, 1, newValue);
      }
    }
  });
};

const processTerm = () => {
  const canPressEnter = isWordComplete.value;
  if (!canPressEnter) {
    return;
  }
  if (attemptNumber.value === 0) {
    return;
  }

  typedTerm.value = results.value[currentRow.value]
    .map((result) => result.letter)
    .join('')
    .toLowerCase();

  const result = calculate(typedTerm.value, secretTerm.value);
  results.value[currentRow.value] = result;

  attemptNumber.value = attemptNumber.value - 1;
  currentRow.value += 1;
  currentColumn.value = 0;

  calculateUsedLetters();
  keyboard.value.setLettersState(usedLetters);
};

const onLetterClick = (index: number) => {
  currentColumn.value = index;
  console.log('currentColumn.value', currentColumn.value);
};

const isWordComplete = computed(() => {
  const value = results.value[currentRow.value];
  // console.log(value.length);

  if (!value || value.length === 0) {
    return false;
  }

  return value.every((result) => result.letter !== '');
});

const isGameOver = computed(() => {
  return attemptNumber.value === 0;
});

const isWin = computed(() => {
  return typedTerm.value === sanitizedSecretTerm.value;
});
</script>
<template>
  <main :class="style.main">
    <div :class="style.content">
      <!-- {{ isWordComplete }} -->
      <!-- <div>Tentativas: {{ attemptNumber }}</div> -->
      <div v-if="isGameOver" style="padding: 20px">
        <div>A palavra é: {{ secretTerm }}</div>
        <div>
          <ButtonComp @click="reset">Jogar de novo</ButtonComp>
        </div>
      </div>
      <div v-if="isWin" style="padding: 20px">
        <div>Parabens, você acertou!!!</div>
        <div>
          <ButtonComp @click="reset">Jogar de novo</ButtonComp>
        </div>
      </div>
      <div class="scroll">
        <!-- <Word :term="term" @onLetterClick="onLetterClick" /> -->
        <Word
          v-for="(result, index) in results"
          :key="`${index}`"
          :result="result"
          :size="MAX_COLUMN_SIZE"
          :is-revealed="currentRow > index"
          :is-selected="currentRow === index"
          :current-letter-index="currentColumn"
          @onLetterClick="onLetterClick"
        />
      </div>
    </div>
    <div :class="style.keyboard">
      <Keyboard
        ref="keyboard"
        @onLetter="(letter: string) => addLetter(letter)"
        @onEnter="processTerm"
        @onDel="removeLetter"
      />
    </div>
  </main>
</template>
