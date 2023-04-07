<template>
  <Suspense>
    <template #default>
      <HomeView :user="user" :auth="auth"/>
    </template>
    <template #fallback>
      <LoadingWidget></LoadingWidget>
    </template>
  </Suspense>
</template>

<script>
import HomeView from "./HomeView.vue";
import LoadingWidget from "../components/shared/LoadingWidget.vue";
import { useStore } from "vuex";

export default {
  components: { HomeView, LoadingWidget},
  props: {
    user: Object,
    auth: Object
  },
  created() {
    const store = useStore();
    store.state.visible = false;
  }
}
</script>