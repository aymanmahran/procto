<template>
    <div class="expanded-assessment-item">
      <div class="assessment-item">
        <div @click="startAssessment" style="margin-left: 30px;">
          <div style="font-weight: bold; font-size: 20px; margin-bottom: 10px; margin-top:10px; text-align: left;">{{ assessment.title }}</div>
          <div class="text">{{ assessment.course }}</div>
        </div>
        <div style="margin: auto;">
          <div style="color: rgb(99, 99, 99) ;font-size: 14px; margin-bottom: 10px;text-align: left;">{{ assessment.date }} <br/> at {{ assessment.time }}</div>
        </div>
        <div style="margin: auto;">
          <img v-if="expanded" @click="expand" src="../../assets/collapse.jpg" width="30" height="30"/>
          <img v-else @click="expand" src="../../assets/expand.png" width="30" height="30"/>
        </div>
      </div>
      <div v-if="expanded" class="text" style="height: 30px; margin: 20px; margin-top:20; font-style: italic;">
      {{ assessment.grade ? `Grade: ${assessment.grade}%`: "Not graded yet"}}
      </div>
    </div>
  </template>
  
  <script>

  import { useStore } from 'vuex';

  export default {
    name: "AssessmentItem",
    props: {
      assessment: {
        type: Object,
      }
    },
    data() {
      return {
        expanded: false,
        store: null
      }
    },
    methods: {
      expand() {
        console.log(this.expanded)
        this.expanded = !this.expanded;
      },
      startAssessment() {
        const now = Math.floor(Date.now() / 1000);
        if(this.assessment.timestamp > now){
          alert("Assessment is not available yet!")
        }
        else {
          console.log(this.store);
          this.store.state.selectedAssessment = this.assessment.assessment;
          this.$router.push({name: 'assessment'});
        }
      }
    },
    created() {
      const store = useStore();
      this.store = store;
    }
  }
  </script>
  
<style scoped>

  .expanded-assessment-item {
        width:calc(100% - 20px);
        color: rgb(17, 17, 17);
        border-radius: 15px;
        background-color: rgb(211, 210, 210);
        transition: all 0.5s ease-in;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        padding:0px, auto;
    }

    .assessment-item {
        display: grid;
        grid-template-columns: 1fr 150px 50px;
        width:calc(100% - 20px);
        height: 80px;
        /* font-size: 20px; */
        /* font-weight: bold; */
        color: rgb(17, 17, 17);
        border-radius: 15px;
        background-color: rgb(238, 238, 238);
        transition: all 0.5s ease-in;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        padding:0px, auto;
    }

    .assessment-item:hover { 
        background: #a5a5a5;
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
</style>