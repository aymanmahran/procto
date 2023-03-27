<template>
    <div class="student-item">
      <div style="text-align:left; margin-left: 50px"> {{ student.firstname }}</div>
      <div style="text-align:left"> {{ student.lastname }}</div>
      <div style="text-align:center"> {{ student.email }}</div>
      <div style="text-align:right; margin-right: 50px"> {{ student.id }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StudentItem",
    props: {
      student: {
        type: Object,
      }
    },
    methods: {
    }
  }
  </script>
  
<style scoped>
    .student-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width:calc(100% - 20px);
        height: 60px;
        font-size: 18px;
        color: #2c3f55;
        border-radius: 15px;
        background-color: #fff;
        align-items: center;
        justify-content:center;
        transition: all .15s ease-in;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    .student-item:hover { 
        background: #d1d1d1;
    }
</style>