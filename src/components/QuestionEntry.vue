<template>
    <div class="question-entry">
      <a :href="`#${questionNumber}`" @click="$emit('goTo', questionNumber)">{{ `Question ${questionNumber}`}}</a>
    </div>
  </template>
  
  <script>
  export default {
    name: "QuestionEntry",
    props: {
      questionNumber: {
        type: String,
      }
    },
    methods: {
     
    }
  }
  </script>
  
<style scoped>
    .question-entry {
        display: flex;
        width:calc(100% - 30px);
        height: 60px;
        font-size: 20px;
        color: rgb(218, 218, 218);
        border-radius: 15px;
        background-color: 7a0000;
        align-items: center;
        justify-content:center;
        transition: all .15s ease-in;
        margin-bottom: 5px;
        margin-left: 15px;
        margin-right: 10px;
        cursor: pointer;
    }

    .question-entry:hover { 
        background: #953333;
    }

    a {
      color:rgb(218, 218, 218);
      text-decoration: none;
    }
</style>