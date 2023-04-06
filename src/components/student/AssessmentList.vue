<template>
  <div>
    <h2 style="margin-left:30px">Upcoming Assessments</h2>
    <div class="assessment-list">
        <TransitionGroup name="list" tag="div">
          <AssessmentItem v-for="assessment in upcomingAssessments" :key="assessment.id" :assessment="assessment"></AssessmentItem>
        </TransitionGroup>
      </div>

    <h2 style="margin-left:30px">Past Assessments</h2>
    <div class="assessment-list">
      <TransitionGroup name="list" tag="div">
        <AssessmentItem v-for="assessment in pastAssessments" :key="assessment.id" :assessment="assessment"></AssessmentItem>
      </TransitionGroup>
    </div>
  </div>
</template>
  
<script>
// import { ImmutableAssessment, AnswerableAssessment } from 'procto-api';
import AssessmentItem from './AssessmentItem.vue';
// import { useStore } from 'vuex';
  
  export default {
    name: "AssessmentList",
    props: {
      courseTitle: {
        type: String,
      },
      pastAssessments: {
        type: Array,
      },
      upcomingAssessments: {
        type: Array,
      }
    },
    components: {
      AssessmentItem
    },
    data() {
      return {
        decoratedAssessments: []
      }
    },
    methods: {
      
    },
    async created() {
      // const store = useStore();
      console.log("dsfdsfs");
      // this.pastAssessments = [];
      // this.comingAssessments = [];

      /*
      for (let assessment of this.pastAssessmentObjects) {
        const id = await assessment.getId();
        const title = await assessment.getTitle();
        const date = await assessment.getStartDate();
        const grade = await a.getFinalMark();
        
        const obj = {
          assessment: a,
          id: id,
          title: title,
          course: this.courseTitle,
          grade: grade,
          timestamp: date,
          date: (new Date(date * 1000)).toDateString(),
          time: (new Date(date * 1000)).toLocaleString().split(',')[1].split(':').slice(0, 2).join(":")
        };

        this.pastAssessments.push(obj);
      }

      for (let assessment of this.upComingAssessmentObjects) {
        const id = await assessment.getId();
        const title = await assessment.getTitle();
        const date = await assessment.getStartDate();
        
        const obj = {
          assessment: a,
          id: id,
          title: title,
          course: this.courseTitle,
          grade: undefined,
          timestamp: date,
          date: (new Date(date * 1000)).toDateString(),
          time: (new Date(date * 1000)).toLocaleString().split(',')[1].split(':').slice(0, 2).join(":")
        };

        this.upcomingAssessments.push(obj);
      }

      this.pastAssessments = this.pastAssessments.sort((a, b) => b.timestamp - a.timestamp);
      this.comingAssessments = this.comingAssessments.sort((a, b) => b.timestamp - a.timestamp);*/
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
  