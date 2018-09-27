<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="/favicon-96x96.png" alt="Chester Devs" width="36" height="36">
        </a>
        <a role="button" aria-label="menu" aria-expanded="false" :class="['navbar-burger', menu ? 'is-active' : '' ]" @click="menu = !menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div :class="['navbar-menu', 'has-text-centered', menu ? 'is-active' : '' ]">
        <div class="navbar-item">
          <button class="button is-primary" @click="sendPush">
            <span>Send Push</span>
          </button>
        </div>
        <div class="navbar-item">
          <button class="button" @click="syncPush">
            <span>Sync Push</span>
          </button>
        </div>
      </div>
    </nav>
    <div class="container">
      <section class="section has-text-centered">
        <img alt="Chester Devs" class="image is-inline" src="./assets/logo.png">
      </section>
      <MeetupList></MeetupList>
    </div>
  </div>
</template>

<script>
import MeetupList from './components/MeetupList.vue'

import { PushService } from './services/PushService'

const pushService = new PushService()

export default {
  name: 'app',
  components: {
    MeetupList
  },
  data () {
    return {
      menu: false
    }
  },
  methods: {
    sendPush: async () => {
      await pushService.sendPush()
    },
    syncPush: async () => {
      await pushService.syncPush()
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="css">
@import '../node_modules/bulma/css/bulma.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
