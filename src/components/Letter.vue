<script setup lang="ts">
const props = defineProps({
  letter: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  isExist: {
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
  <div
    class="letter"
    :class="{
      'letter--is-correct': props.isCorrect,
      'letter--is-exist': props.isExist,
      'letter--is-revealed': props.isRevealed,
    }"
  >
    {{ letter }}
  </div>
</template>

<style scoped>
.letter {
  border: 1px solid;
  padding: 10px;
  margin-right: 4px;
  min-height: 45px;
  min-width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 900;
}
.letter--is-revealed {
  background: SlateGray;
  color: DarkSlateGray;
}
.letter--is-correct.letter--is-revealed {
  background: springgreen;
  color: DarkSlateGray;
}
.letter--is-exist.letter--is-revealed {
  background: PaleGoldenRod;
}
</style>
