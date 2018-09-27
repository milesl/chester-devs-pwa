<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <span :class="[meetup.status === 'past' ? 'is-light' : 'is-primary', 'button']">{{ meetup.status }}</span>
      </div>
      <div class="media-content">
        <div class="content">
          <p class="title is-4">{{ meetup.name }}</p>
          <p class="subtitle is-6">{{ meetup.localDate }} {{ meetup.localTime }}</p>
        </div>
        <div class="content has-text-left" v-html="meetup.description">
        </div>
      </div>
    </article>
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
