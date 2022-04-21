<script setup lang="ts">
import { themeClass, vars } from "./theme.css";
import * as style from "./App.css.ts"

import { onMounted, ref, computed, nextTick } from 'vue';
import { calculate, resultFromTerm, createEmptyResult } from './functions';
import { getWord } from './words';
import { ResultItem } from './types';
const { log } = console;

const MAX_ATTEMPTS = 5;
const MAX_COLUMN_SIZE = 5;
const MAX_ROW_SIZE = 5;

const secretTerm = getWord();
const input = ref();
const size = ref(5);

const term = ref('    ');
const results = ref([[],[],[],[],[]]);
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

const replaceAt = (value:string, replacement: string, index: number, ) => {
    if (index >= value.length) {
        return value.valueOf();
    }

    return value.substring(0, index) + replacement + value.substring(index + 1);
}

const onType = (event: Event) => {
  const ENTER = 13
  if (event.keyCode === ENTER) {
    onSubmit()
    return
  }
  if(currentColumn.value === MAX_COLUMN_SIZE) {
    return
  }
  if(currentRow.value === MAX_ROW_SIZE) {
    return
  }

  /**
   * Fill array
   */
  const size = results.value[currentRow.value].length
  if (size !== currentColumn.value) {
    for(let i = size; i < currentColumn.value; i++) {
      results.value[currentRow.value].push({letter: ""})
    }
  }


  const letter = String.fromCharCode(event.keyCode)
  const position = results.value[currentRow.value]
  console.log(JSON.stringify(position))
  if (position.length === 0) {
    position.push({letter})
  } else if (position[currentColumn.value]) {
    position.splice(currentColumn.value, 1, {letter})
  } else {
    position.push({letter})
  }
  currentColumn.value += 1
};

document.addEventListener('keypress', onType)

const onSubmit = () => {
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
</script>

<template>
<div :class="themeClass">
<main :class="style.main">
  <!-- <form @submit.prevent="onSubmit">
    <input
      ref="input"
      @input="onType"
      :maxlength="size"
      class="input"
      :class="{
        'input--is-valid': isInputValid,
      }"
    />
  </form> -->
  <div>Tentativas: {{ attemptNumber }}</div>
  <div v-if="attemptNumber === 0">A palavra é: {{ secretTerm }}</div>
  {{secretTerm}}
  <div class="scroll">
    <!-- {{results}}
    {{currentColumn}}
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
  /* height: 300px; */
  overflow-y: auto;
}
</style>
