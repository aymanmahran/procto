<template>
  <router-link :to="`/view-assessment?assessment=`+assessment+`&student=`+student.id">
    <div class="student-item">
      <div style="text-align:left; margin-left: 50px"> {{ student.firstname }}</div>
      <div style="text-align:left"> {{ student.lastname }}</div>
      <div style="text-align:center"> {{ student.grade }}</div>
    </div>
  </router-link>
</template>
  
  <script>
  export default {
    name: "StudentResponseItem",
    props: {
      student: {
        type: Object,
      },
      assessment: {
        type: String
      }
    },
    methods: {
    }
  }
  </script>
  
<style scoped>
    .student-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width:calc(100% - 20px);
        height: 60px;
        font-size: 18px;
        color: #2c3f55;
        border-radius: 15px;
        background-color: rgb(247, 247, 247);
        align-items: center;
        justify-content:center;
        transition: all .15s ease-in;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    .student-item:hover { 
        background: #fff;
    }
</style>