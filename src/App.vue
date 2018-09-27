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
      <div class="notification" v-if="showNotification">
        <button class="delete" @click="showNotification = false"></button>
        <span v-html="message"></span>
      </div>
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
import { setTimeout } from 'timers';

const pushService = new PushService()

export default {
  name: 'app',
  components: {
    MeetupList
  },
  data () {
    return {
      menu: false,
      showNotification: false,
      message: null
    }
  },
  methods: {
    sendPush: async function () {
      await pushService.sendPush()
    },
    syncPush: async function () {
      await pushService.syncPush()
    },
    syncPushSent: function () {
      this.showNotification = true
      this.message = 'Your push message has been sent using background sync.'
      this.hideNotification()
    },
    hideNotification: function () {
      setTimeout(() => { this.showNotification = false }, 3000)
    }
  },
  mounted () {
    if('BroadcastChannel' in window) {
      const br = new BroadcastChannel('chester-devs')
      br.onmessage = () => this.syncPushSent()
    } else {
      navigator.serviceWorker.addEventListener('message', () => this.syncPushSent())
    }
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
