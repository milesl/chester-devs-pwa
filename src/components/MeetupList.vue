<template>
  <div class="meetups">
    <div class="dialog" v-if="error">
      {{ error }}
    </div>
    <meetup v-for="(m, i) in meetupsPage" :key="i" :meetup="m" ></meetup>
    <div class="card">
      <div class="card-content">
      <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous" :disabled="page == 1" @click="changePage(page - 1)">Previous</a>
      <a class="pagination-next" :disabled="page == totalPages" @click="changePage(page + 1)">Next page</a>
      <ul class="pagination-list">
        <li v-for="n in totalPages" :key="n">
          <a :class="[ page === n ? 'is-current' : '', 'pagination-link']" @click="changePage(n)">{{ n }}</a>
        </li>
      </ul>
    </nav>
      </div>
    </div>
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
      meetups: [],
      page: 1,
      pageSize: 10,
      error: null
    }
  },
  methods: {
    changePage: function (index) {
      if (index >= 1 && index <= this.totalPages) {
        this.page = index
      }
    }
  },
  computed: {
    meetupsPage: function () {
      return this.meetups.slice(this.pageStartIndex, this.pageEndIndex)
    },
    totalPages: function () {
      return Math.ceil(this.meetups.length / this.pageSize)
    },
    pageStartIndex: function () {
      return (this.page - 1) * this.pageSize
    },
    pageEndIndex: function () {
      return ((this.page - 1) * this.pageSize) + 10
    },
  },
  async mounted () {
    try {
      this.meetups = await meetupService.getMeetups()
    } catch (e) {
      this.error = e.message
    }
  } 
}
</script>

<style scoped type="css">
</style>
