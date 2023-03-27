<template>
  <div class="parent-container">
    <div class="assessment-item">
        <div style="margin: auto; margin-left: 30px;">
          <div style="font-weight: bold; font-size: 20px; margin:auto; text-align: left;"> Test </div>
        </div>
      <div class="hover">
        <img style="margin: auto" @click="expand" src="../../assets/edit.png" width="25" height="25"/>
      </div>

      <div class="hover">
        <img style="margin: auto" @click="expand" src="../../assets/delete.png" width="25" height="25"/>
      </div>

      <div class="hover">
        <img v-if="expanded" style="margin: auto" @click="expand" src="../../assets/collapse.jpg" width="30" height="30"/>
        <img v-else style="margin: auto" @click="expand" src="../../assets/expand.png" width="30" height="30"/>
      </div>
    </div>
    <div class="expandable" ref="student-responses" :style="[expanded ? { height : computedHeight } : {}]">
      <div style="margin-top: 15px; margin-bottom: 15px">
        <StudentResponseItem v-for="response in studentResponses" :key="response.student.id" :student="response.student" :assessment="assessment.id"/>
      </div>
    </div>
  </div>
  </template>
  
  <script>

  import StudentResponseItem from './StudentResponseItem.vue';

  export default {
    name: "AssessmentItem",
    props: {
      assessment: {
        type: Object
      },
      studentResponses: {
        type: Object
      }
    },
    data() {
      return {
        expanded: false,
        computedHeight: 0
      }
    },
    components: {
      StudentResponseItem
    },
    methods: {
      expand() {
        if(this.computedHeight == 'auto') this.initHeight();
        console.log(this.expanded)
        setTimeout(() => this.expanded = !this.expanded, 100);
      },
      initHeight() {

        this.$refs['student-responses'].style.height = 'auto';
        this.$refs['student-responses'].style.position = 'absolute';
        this.$refs['student-responses'].style.visibility = 'hidden';
        this.$refs['student-responses'].style.display = 'block';
        const height = getComputedStyle(this.$refs['student-responses']).height;      
        this.computedHeight= height;

        this.$refs['student-responses'].style.position = null;
        this.$refs['student-responses'].style.visibility = null;
        this.$refs['student-responses'].style.display = null;
        this.$refs['student-responses'].style.height = 0;
        console.log(height);
      }
    },
    mounted() {
      this.initHeight();
    }
  }
  </script>
  
<style scoped>

    .parent-container {
        margin-bottom: 25px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .assessment-item {
        display: grid;
        grid-template-columns: 1fr 45px 45px 45px 10px;
        width:calc(100% - 0px);
        height: 80px;
        /* font-size: 20px; */
        /* font-weight: bold; */
        color: rgb(17, 17, 17);
        border-radius: 15px;
        background-color: rgb(238, 238, 238);
        transition: all 0.5s ease-in;
        cursor: pointer;
        padding:0px, auto;
        z-index: 10;
    }

    .assessment-item:hover { 
        background: #d4d4d4;
    }

    .text{
      font-size: 16px;
      margin-bottom: 10px;
      text-align: left;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .hover {
      margin: auto;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      transition: all 0.2s ease-in;
    }
    .hover:hover { 
        background: #adadad;
    }

    .expandable {
      height: 0;
      overflow: hidden;
      transition: all 0.5s;
      background: rgb(247, 247, 247);
      margin: 0px;
      margin-top: -15px;
      /* padding: 10px; */
      z-index: 1;
      /* background: linear-gradient(to bottom,#ccc , transparent 20%); */
      /* padding-top: 30px; */
    }
</style>