<script setup lang="ts">
import { themeClass, vars } from "./theme.css";
import * as style from "./App.css.ts"

import { onMounted, ref, computed, nextTick } from 'vue';
import { calculate, resultFromTerm, createEmptyResult } from './functions';
import { getWord } from './words';
const { log } = console;

const MAX_ATTEMPTS = 6;
const MAX_COLUMN_SIZE = 5;
const MAX_ROW_SIZE = 6;

const secretTerm = getWord();
// const secretTerm = 'ácido';
const size = ref(5);

const term = ref('    ');
const results = ref([[],[],[],[],[],[]]);
const attemptNumber = ref(MAX_ATTEMPTS);
const currentRow = ref(0);
const currentColumn = ref(0);

const isInputValid = computed(() => {
  return term.value.length === size.value;
});
const wordComp = ref();

onMounted(() => {
  // input.value.focus();
});


const handleRemoveLetter = () => {
  const position = results.value[currentRow.value]
  if (position[currentColumn.value]) {
    position.splice(currentColumn.value, 1, {letter: ""})
  } else {
    position.pop()
    currentColumn.value -= 1
  }
}

const handleAddLetter = (letter: string) => {
  /**
   * When click on any position on word, this fill from the beggining until the
   * current position with empty letters
   */
  const size = results.value[currentRow.value].length
  if (size !== currentColumn.value) {
    for(let i = size; i < currentColumn.value; i++) {
      results.value[currentRow.value].push({letter: ""})
    }
  }

  const position = results.value[currentRow.value]

  if (position[currentColumn.value]) {
    position.splice(currentColumn.value, 1, {letter})
  } else {
    position.push({letter})
  }
  currentColumn.value += 1
}

const onType = (event: Event) => {
  // console.log(event.keyCode)
  const ENTER = 13
  const DEL = 46
  const BACKSPACE = 8
  if (event.keyCode === ENTER) {
    submitResult()
    return
  }
  if([DEL, BACKSPACE].includes(event.keyCode)){
    handleRemoveLetter()
    return
  }
  if(currentColumn.value >= MAX_COLUMN_SIZE) {
    return
  }
  if(currentRow.value >= MAX_ROW_SIZE) {
    return
  }

  const letter = String.fromCharCode(event.keyCode)

  handleAddLetter(letter)
};



const submitResult = () => {
  if (attemptNumber.value === 0) {
    return;
  }

  const typedTerm = results.value[currentRow.value].map((result) => result.letter).join("")

  const result = calculate(typedTerm, secretTerm);
  log(typedTerm, result)
  results.value[currentRow.value] = result

  attemptNumber.value = attemptNumber.value - 1;
  currentRow.value += 1;
  currentColumn.value = 0
};

const onLetterClick = (index: number) => {
  currentColumn.value = index
}

document.addEventListener('keydown', onType)
</script>

<template>
<div :class="themeClass">
<main :class="style.main">
  <div>Tentativas: {{ attemptNumber }}</div>
  <div v-if="attemptNumber === 0">A palavra é: {{ secretTerm }}</div>
  <!-- {{secretTerm}} -->
  <div class="scroll">
    <!-- {{results}} -->
    <!-- {{currentColumn}}
    {{results[currentRow].length}} -->
    <Word
      v-for="(result, index) in results"
      :key="`${index}`"
      :result="result"
      :size="size"
      :is-revealed="currentRow > index"
      :is-selected="currentRow === index"
      :current-letter-index="currentColumn"
      @onLetterClick="onLetterClick"
    />
  </div>
</main>
</div>
</template>

<style>

.input {
  outline: none !important;
  text-transform: uppercase;
}

.input.input--is-valid {
  border: 2px solid #00fa9a;
  border-radius: 2px;
}

.scroll {
  overflow-y: auto;
}
</style>
