<template>
  <section class="meetup">
      <h1>{{ meetup.name }}</h1>
      <h3><small>{{ meetup.localDate }} {{ meetup.localTime }}</small></h3>
      <span v-html="meetup.description"></span>
  </section>
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
