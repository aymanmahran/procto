<template>
  <div>
    <h2 style="margin-left:30px">Upcoming Assessments</h2>
    <div class="assessment-list">
        <TransitionGroup name="list" tag="div">
          <AssessmentItem v-for="assessment in comingAssessments" :key="assessment.id" :assessment="assessment"></AssessmentItem>
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
import { ImmutableAssessment, AnswerableAssessment } from 'procto-api';
import AssessmentItem from './AssessmentItem.vue';
import { useStore } from 'vuex';
  
  export default {
    name: "AssessmentList",
    props: {
      courseTitle: {
        type: String,
      },
      assessmentObjects: {
        type: Array,
      }
    },
    components: {
      AssessmentItem
    },
    data() {
      return {
        comingAssessments: [],
        pastAssessments: [],
        decoratedAssessments: []
      }
    },
    methods: {
      
    },
    async created() {
      const store = useStore();
      console.log("dsfdsfs");
      this.pastAssessments = [];
      this.comingAssessments = [];
      this.decoratedAssessments = [];
      const now = Math.floor(Date.now() / 1000);
      this.assessmentObjects.forEach(async(assessment) => {
        const id = await assessment.getId();
        const title = await assessment.getTitle();
        const date = await assessment.getStartDate();
        let a = null;
        let grade = null;
        if (date < now) {
          a = new ImmutableAssessment(assessment, store.state.username);
          this.decoratedAssessments.push(a);
          grade = await a.getFinalMark();
          console.log("Fsdfsd", grade);
        }
        else {
          a = new AnswerableAssessment(assessment);
          this.decoratedAssessments.push(a);
        }

        const obj = {
          assessment: a,
          id: id,
          title: title,
          course: this.courseTitle,
          grade: grade,
          date: (new Date(date * 1000)).toDateString(),
          time: (new Date(date * 1000)).toLocaleString().split(',')[1].split(':').slice(1).join(":")
        };
        if (date < now) this.pastAssessments.push(obj);
        else this.comingAssessments.push(obj);
      });

      // this.comingAssessmentObjects.forEach(async(assessment) => {
      //   const id = await assessment.getId();
      //   const title = await assessment.getTitle();
      //   const date = await assessment.getStartDate();
      //   const grade = "Not taken yet";
      //   const obj = {
      //     id: id,
      //     title: title,
      //     course: this.courseTitle,
      //     grade: grade,
      //     date: (new Date(date * 1000)).toDateString(),
      //     time: (new Date(date * 1000)).getHours() + ':' + (new Date(date * 1000)).getMinutes()
      //   };
      //   this.comingAssessments.push(obj);
      // });
      console.log(this.assessments);
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
  