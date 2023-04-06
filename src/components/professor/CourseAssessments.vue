<template>
    <div class="tabs_content">
        <div v-if="selected == 0"> <AssessmentItem v-for="assessment in assessments" :key="assessment.id" :title="assessment.title" :assessment="assessment"/> </div>
        <div style="width: 100%; margin-top: 25%;" v-else-if="selected == 1"> <LoadingWidget></LoadingWidget> </div>
    </div>
</template>

<script>

import AssessmentItem from './AssessmentItem.vue';
import LoadingWidget from '../shared/LoadingWidget.vue';

export default {
    name: "CourseAssessments",
    props: {
      title: {
        type: String
      },
      course: {
        type: Object
      }
    },
    watch: {
      async course() {
        // this.assessments = await this.course.getAssessments();
        // this.studentResponses = [];
        // this.assessments.forEach(async (assessment) => {
        //   var s = await this.course.getStudentResponses(assessment.id);
        //   this.studentResponses.push(s);
        // });
        // console.log(this.studentResponses);
      }
    },
    components: {
      AssessmentItem,
      LoadingWidget
    },
    data() {
      return {
        assessments: [],
        assessmentObjects: [],
        selected: 1
      };
    },
    methods: {
    },
    async created() {
        this.selected = 1;
        this.assessmentObjects = await this.course.getAssessments();

        this.assessments = [];
        for(let assessment of this.assessmentObjects) {
          const id = await assessment.getId();
          const title = await assessment.getTitle();

          this.assessments.push({
            id: id,
            title: title,
            assessment: assessment
          })
        }
        this.selected = 0;
        console.log("Fdsfdsfsf", this.assessments);

        // this.assessments.forEach(async (assessment) => {
        //   var s = await this.course.getStudentResponses(assessment.id);
        //   this.studentResponses.push(s);
        // });
        // console.log(this.studentResponses);
      }
  }
</script>

<style scoped>
.tabs_content {
    background-color: #fff;
    min-height: calc(100% - 170px);
    /* display: grid;
    place-items: center; */
    border-radius: 0 0 5px 5px;
    border-style: solid;
    border-color: #d1d1d1;
    padding: 10px;
}
</style>