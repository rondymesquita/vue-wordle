<script setup lang="ts">
/* @ts-ignore */
import * as style from './ButtonComp.css.ts';
</script>

<template>
  <div :class="style.button">
    <slot></slot>
  </div>
</template>

<style scoped></style>
