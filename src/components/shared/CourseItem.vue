<template>
    <div class="course-item">
      <a @click="$emit('selectCourse', courseName)">{{ courseName }}</a>
    </div>
  </template>
  
  <script>
  export default {
    name: "CourseItem",
    props: {
      courseName: {
        type: String,
      }
    },
    methods: {
    }
  }
  </script>
  
<style scoped>
    .course-item {
        display: flex;
        width:calc(100% - 20px);
        height: 60px;
        font-size: 20px;
        font-weight: bold;
        color: rgb(218, 218, 218);
        border-radius: 15px;
        background-color: 7a0000;
        align-items: center;
        justify-content:center;
        transition: all .15s ease-in;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    .course-item:hover { 
        background: #953333;
    }
</style>