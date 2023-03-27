<template>
    <div class="sidebar">
      <div class="top-rect">
        <img class="user-img" src="../../assets/user.jpg">
        <div class="title">Hello, {{ name.slice(0, 5) }}</div>
      </div>
      <div class="course-list">
        <CourseItem v-for="course in courses" :key="course" :courseName="course" @selectCourse="selectCourse"></CourseItem>
      </div>


      <div style="margin:auto">
        <div class="button" @click="$emit('logout')">Logout</div>
        <div style="padding-top:20px;"> Copyright &copy; 2023</div>
        <div style="text-align: center; padding:10px"> Procto</div>
      </div>

    </div>
  </template>
  
  <script>
  import CourseItem from './CourseItem.vue';
  
  export default {
    name: "SideBar",
    props: {
      name: {
        type: String,
      },
      courses: {
        type: Array,
      }
    },
    components: {
      CourseItem
    },
    methods: {
      selectCourse (courseName) {
        this.$emit('selectCourse', courseName);
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    /* width: 200px;
    height: 100%;
    padding: 20px; */
    
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
  
  .user-img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 10px;
    margin-left: 30px;
  }

  .course-list {
    /* display: flex; */
    /* align-items: center;
    justify-content: center; */
    /* margin: 20px; */
    height: calc(100% - 70px);
    margin-top: 50px;
  }

  .button {
    display: flex;
    min-height: 40px;
    font-size: 14px;
    width: 70px;
    color: rgb(218, 218, 218);
    border-radius: 7px;
    background-color:#330000;
    align-items: center;
    justify-content:center;
    cursor: pointer;
    transition: all .15s ease-in;
    margin: 0 auto;
  }

  .button:hover { 
      background: #953333;
  }

  </style>
  