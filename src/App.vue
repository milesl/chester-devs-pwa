<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <MeetupList></MeetupList>
  </div>
</template>

<script>
import MeetupList from './components/MeetupList.vue'

export default {
  name: 'app',
  components: {
    MeetupList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
