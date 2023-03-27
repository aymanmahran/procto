
import HomeView from './HomeView.vue';

<template>
  <Suspense>
    <template #default>
      <HomeView :user="user" :auth="auth"/>
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script>
import HomeView from "./HomeView.vue"

export default {
  components: { HomeView },
  props: {
    user: Object,
    auth: Object
  },
}
</script>
