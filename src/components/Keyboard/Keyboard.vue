<script setup lang="ts">

import * as style from './Keyboard.css.ts'

const props = defineProps({
  letter: {
    type: String,
  },
});

const mapLetters = [
	["q","w","e","r","t","y","u","i","o","p"],
	["a","s","d","f","g","h","j","k","l","[del]"],
	["z","x","c","v","b","n","m","[enter]"]
]

</script>

<template>

<div :class="style.keyboard">
<div :class="style.line" v-for="mapLetter in mapLetters">
	<div :class="style.letter" v-for="letter in mapLetter" >
	<span v-if="letter === '[del]'" @click="$emit('onDelClick')">
	{{letter}}
	</span>
	<span v-else-if="letter === '[enter]'" @click="$emit('onEnterClick')">
	{{letter}}
	</span>
		<span v-else @click="$emit('onLetterClick', letter.toLowerCase())">
	{{letter}}
	</span>
	</div>
</div>
</div>
</template>

<style scoped>


</style>
