<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <span :class="[meetup.status === 'past' ? 'is-light' : 'is-primary', 'button']">{{ meetup.status }}</span>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ meetup.name }}</p>
          <p class="subtitle is-6">{{ meetup.localDate }} {{ meetup.localTime }}</p>
        </div>
      </div>
      <div class="content has-text-left" v-html="meetup.description">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Meetup',
  props: { 
      meetup: null
  } 
}
</script>

<style scoped>
</style>
