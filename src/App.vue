<script setup lang="ts">
import { themeClass, vars } from './theme.css';
/* @ts-ignore */
import * as style from './App.css.ts';
import { KeyboardController } from './controllers/keyboard-controller';
import { onMounted, onUnmounted, ref } from 'vue';

const { log } = console;
let controller: KeyboardController;

const letter = ref('');
const game = ref();

onMounted(() => {
  controller = new KeyboardController();
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
body {
  margin: 0;
}
</style>
