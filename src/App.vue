<template>
    <router-view/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'App',
        components: {
        }
    });
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
        width: 100%;
    }

	html, body {
		margin: 0;
		padding: 0;
		height: 100%;
        width: 100%;
	}
</style>
