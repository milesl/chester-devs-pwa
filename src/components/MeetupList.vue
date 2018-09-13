<template>
  <div class="meetups">
    <meetup v-for="(m, i) in meetups" :key="i" :meetup="m"></meetup>
  </div>
</template>

<script>
import Meetup from './Meetup'
import { MeetupService } from '../services/MeetupService'

const meetupService = new MeetupService()

export default {
  name: 'MeetupList',
  components: {
    Meetup
  },
  props: { },
  data () {
    return {
      meetups: []
    }
  },
  async mounted () {
    this.meetups = await meetupService.getMeetups()
  } 
}
</script>

<style scoped>
</style>
