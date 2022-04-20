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
    <div class="letter__content">
      <div class="letter__front">
        {{ letter }}
      </div>
      <div class="letter__back">
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.letter {
  margin-right: 4px;
  min-height: 45px;
  min-width: 45px;
  font-weight: 900;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.letter__content {
  border: 1px solid;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  transition: all 1.3s;
  transform-style: preserve-3d;
}

.letter--is-revealed .letter__content {
  background: SlateGray;
  color: DarkSlateGray;
}
.letter--is-correct.letter--is-revealed .letter__content {
  background: springgreen;
  color: DarkSlateGray;
}
.letter--is-exist.letter--is-revealed .letter__content {
  background: PaleGoldenRod;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.letter.letter--is-revealed .letter__content {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.letter__front,
.letter__back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style the front side (fallback if image is missing) */
.letter__front {
}

/* Style the back side */
.letter__back {
  transform: rotateY(180deg);
}
</style>
