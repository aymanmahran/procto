<template>
  <div>
    <h2 style="margin-left:30px">Upcoming Assessments</h2>
    <div class="assessment-list">
        <TransitionGroup name="list" tag="div">
          <AssessmentItem v-for="assessment in assessments" :key="assessment.id" :assessment="assessment"></AssessmentItem>
        </TransitionGroup>
      </div>

    <h2 style="margin-left:30px">Past Assessments</h2>
    <div class="assessment-list">
      <TransitionGroup name="list" tag="div">
        <AssessmentItem v-for="assessment in assessments" :key="assessment.id" :assessment="assessment"></AssessmentItem>
      </TransitionGroup>
    </div>
  </div>
</template>
  
<script>
import AssessmentItem from './AssessmentItem.vue';
  
  export default {
    name: "AssessmentList",
    props: {
      name: {
        type: String,
      },
      assessments: {
        type: Array,
      }
    },
    components: {
      AssessmentItem
    },
    methods: {
      
    }
  }
  </script>
  
  <style>

  .assessment-list {
    /* display: flex; */
    /* align-items: center;
    justify-content: center; */
    /* margin: 20px; */
    margin: auto;
    /* height: calc(100% - 70px); */
    margin: 30px;
    transition: all 0.5s ease-in;

  }
.list-move
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.list-leave-active {
  position: absolute;
}
  </style>
  