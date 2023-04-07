<script setup>
  import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
  import { Amplify } from "aws-amplify";
  import awsconfig from "./aws-exports";

  Amplify.configure(awsconfig);
  const auth = useAuthenticator();

</script>

<template>
  <div v-if="vs" style="width: 100%; margin-top:10px; text-align: center; height: 120px; font-size: 70px; font-weight: bold; color:#7a0000"> Procto </div>
  <authenticator>
    <template v-slot="{ user }">
      <!-- <h1>Hello {{ user.username }}!</h1> -->
        <Suspense>
          <router-view :auth="auth" :user="user"></router-view>
        </Suspense>
      <!-- <button @click="auth.signOut">Sign Out</button> -->
    </template>
  </authenticator>
  <!-- <router-view /> -->

</template>

<script>

import { useStore } from "vuex";
export default {
  data(){
    return {
      store: null,
      v: true
    }
  },
  computed: {
    vs() {
      return this.$store.state.visible;
    },
},
  created() {
    const store = useStore();
    this.store = store;
    this.v = store.state.visible;
  }
}

</script>

<style>
#app {
  font-family:Ubuntu;
  color: #2c3e50;
  height: 100%;
  width:100%;
}

html, body {
  margin:0;
  padding:0;
  height:100%;
}

</style>
