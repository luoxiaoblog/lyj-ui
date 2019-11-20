<template>
<div>
		<h1>{{hello}}</h1>
	</div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class App extends Vue {
	hello: string = 'hello world'
}
</script>

<style lang="scss">
body {
	background: gray
}
</style>
