<script setup>
  import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
  import { Amplify } from "aws-amplify";
  import awsconfig from "./aws-exports";

  Amplify.configure(awsconfig);
  const auth = useAuthenticator();

</script>

<template>
  <authenticator>
    <template v-slot="{ user }">
      <!-- <h1>Hello {{ user.username }}!</h1> -->
        <router-view :auth="auth" :user="user" ></router-view>
      <!-- <button @click="auth.signOut">Sign Out</button> -->
    </template>
  </authenticator>
  <!-- <router-view /> -->

</template>

<script>

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
