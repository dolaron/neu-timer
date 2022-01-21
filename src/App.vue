<template>
  <Timer/>
</template>

<script>
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    Timer
  }
}
</script>

<style>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: rgb(238, 240, 244);
}

#app {
  display: flex;
  height: 100%;
}
</style>
