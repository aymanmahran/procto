<template>
    <div class="sidebar">
      <div class="top-rect">
        
        <div class="title">Hello, {{ name }}</div>
      </div>
      <div class="questions-list">
        <QuestionEntry @goTo="goTo" v-for="question in questions" :key="question" :questionNumber="question"></QuestionEntry>
      </div>
      <div class="button" @click="$emit('submit')">Submit</div>

    </div>
  </template>
  
  <script>
  import QuestionEntry from '../shared/QuestionEntry.vue';
  
  export default {
    name: "AssessmentSideBar",
    props: {
      name: {
        type: String,
      },
      questions: {
        type: Array,
      }
    },
    components: {
      QuestionEntry
    },
    methods: {
      submit() {
        this.$emit('submit');
      },
      goTo(number) {
        this.$emit('goTo', number);
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    background-color: #7a0000;
    position: fixed;
    height: 100%;
    min-height: min-content;
    width: 270px;
    transition: all 0.5s ease;
  }
  
  .top-rect {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #330000;
    height: 150px;
  }

  .title {
    display: flex;
    font-size: 28px;
    font-weight: bold;
    height: 40px;
    color: #fff;
    text-align: center;
    flex-grow: 1;
    margin-left: -15px; 
    align-items: center;
    justify-content:center;
  }
  
  .button {
    display: flex;
    min-height: 40px;
    font-size: 14px;
    width: calc(100% - 50px);
    color: rgb(218, 218, 218);
    border-radius: 7px;
    background-color:#330000;
    align-items: center;
    justify-content:center;
    cursor: pointer;
    transition: all .15s ease-in;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .button:hover { 
      background: #953333;
  }

  .questions-list {
    height: calc(100% - 70px);
    margin-top: 50px;
  }

  </style>
  