<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue';
import { calculate, resultFromTerm } from './functions';
import { getWord } from './words';

const MAX_ATTEMPTS = 5;
const MAX_TERM_SIZE = 5;

const secretTerm = getWord();
const input = ref();
const size = ref(5);

const term = ref(Array(MAX_TERM_SIZE).fill(' ').join(''));
const result = ref();
const attempts = ref([{}, {}, {}, {}, {}]);
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
  // term.value = event.target.value;

  attempts.value[currentRow.value].result = resultFromTerm(
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
  result.value = calculate(term.value, secretTerm);

  attempts.value.push({
    result: result.value,
    term: term.value,
    isRevealed: true,
  });

  term.value = '';
  input.value.value = '';
  attemptNumber.value = attemptNumber.value - 1;

  // nextTick(() => {
  //   const lastIndex = attempts.value.length - 1;
  //   const last = attempts.value[lastIndex];
  //   console.log('>>last', last, attempts.value.length);
  //   setTimeout(() => {
  //     attempts.value.splice(lastIndex, 1, {
  //       result: result.value,
  //       term: term.value,
  //       isRevealed: true,
  //     });
  //   }, 500);
  // });

  event.preventDefault();
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input
      ref="input"
      @input="onType"
      :maxlength="size"
      class="input"
      :class="{
        'input--is-valid': isInputValid,
      }"
    />
  </form>
  <div>Tentativas: {{ attemptNumber }}</div>
  <div v-if="attemptNumber === 0">A palavra é: {{ secretTerm }}</div>

  <div class="scroll">
    <Word
      v-for="(attempt, index) in attempts"
      :key="`${new Date().toISOString()}${attempt.term}`"
      :result="attempt.result"
      :size="size"
      :term="attempt.term"
      :is-revealed="attempt.isRevealed"
      :is-selected="currentRow === index"
    />
  </div>
  <div>
    <!-- <Word
      ref="wordComp"
      :term="term"
      :size="size"
      :result="calculate(term, secretTerm)"
      :is-revealed="false"
    /> -->
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
