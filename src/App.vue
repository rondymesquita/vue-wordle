<script setup lang="ts">
import { app, inputStyle } from './App.css.ts';
import { onMounted, ref, computed, nextTick } from 'vue';
import { calculate, resultFromTerm, createEmptyResult } from './functions';
import { getWord } from './words';
import { ResultItem } from './types';
const { log } = console;

const MAX_ATTEMPTS = 5;
const MAX_TERM_SIZE = 5;

const secretTerm = getWord();
const input = ref();
const size = ref(5);

const term = ref('123');
const results = ref([{}, {}, {}, {}, {}]);
const attemptNumber = ref(MAX_ATTEMPTS);
const currentRow = ref(0);

const isInputValid = computed(() => {
  return term.value.length === size.value;
});
const wordComp = ref();

onMounted(() => {
  // input.value.focus();
});

const onType = (event) => {
  if (attemptNumber.value === 0) {
    return;
  }

  term.value = event.target.value;
  results.value[currentRow.value].result = resultFromTerm(
    event.target.value,
    MAX_TERM_SIZE
  );
};

const onSubmit = (event) => {
  if (input.value.value.length < size.value) {
    return;
  }
  if (attemptNumber.value === 0) {
    return;
  }

  const result = calculate(term.value, secretTerm);
  log(term.value, result);
  results.value[currentRow.value].result = result;

  term.value = '';
  input.value.value = '';
  attemptNumber.value = attemptNumber.value - 1;
  currentRow.value = currentRow.value + 1;

  event.preventDefault();
};
</script>

<template>
  <main :class="app">
    <form @submit.prevent="onSubmit">
      <input
        ref="input"
        @input="onType"
        :maxlength="size"
        :class="[
          inputStyle,
          {
            'input--is-valid': isInputValid,
          },
        ]"
      />
    </form>
    <div>Tentativas: {{ attemptNumber }}</div>
    <div v-if="attemptNumber === 0">A palavra é: {{ secretTerm }}</div>

    <div class="scroll">
      <Word
        v-for="(result, index) in results"
        :key="`${index}`"
        :result="result.result"
        :size="size"
        :is-revealed="currentRow > index"
        :is-selected="currentRow === index"
      />
    </div>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}
</style>
