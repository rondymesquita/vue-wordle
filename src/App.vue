<script setup lang="ts">
import { themeClass, vars } from './theme.css';
import * as style from './App.css.ts';
import { KeyboardController } from './controllers/keyboard-controller';
import Game from './Game.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const { log } = console;
const controller = new KeyboardController();

const letter = ref('');
const game = ref();

onMounted(() => {
  controller.addListeners();
  controller.onDelPress = () => {
    game.value.sendKey('[del]');
  };

  controller.onEnterPress = () => {
    game.value.sendKey('[enter]');
  };

  controller.onKeyPress = (pressedKey: string) => {
    game.value.sendKey(pressedKey);
  };
});

onUnmounted(() => {
  controller.addListeners();
});
</script>

<template>
  <div :class="themeClass">
    <Game ref="game" />
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
