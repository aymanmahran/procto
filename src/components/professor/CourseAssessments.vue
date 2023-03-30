<template>
    <div class="tabs_content">
        <AssessmentItem v-for="(assessment, i) in assessments" :key="assessment.id" :assessment="assessment" :studentResponses="studentResponses[i]"/>
    </div>
</template>

<script>

import AssessmentItem from './AssessmentItem.vue';

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
        this.assessments = await this.course.getAssessments();
        this.studentResponses = [];
        this.assessments.forEach(async (assessment) => {
          var s = await this.course.getStudentResponses(assessment.id);
          this.studentResponses.push(s);
        });
        console.log(this.studentResponses);
      }
    },
    components: {
      AssessmentItem
    },
    data() {
      return {
        assessments: [],
        studentResponses: []
      };
    },
    methods: {
    },
    async created() {
        this.assessments = await this.course.getAssessments();
        //this.assessments.forEach(assessment => this.studentResponses.push(this.course.getStudentResponses(assessment.id)));

        this.assessments = await this.course.getAssessments();
        this.studentResponses = [];
        this.assessments.forEach(async (assessment) => {
          var s = await this.course.getStudentResponses(assessment.id);
          this.studentResponses.push(s);
        });
        console.log(this.studentResponses);

      }
  }
</script>

<style scoped>
.tabs_content {
    background-color: #fff;
    min-height: calc(100% - 150px);
    /* display: grid;
    place-items: center; */
    border-radius: 0 0 5px 5px;
    border-style: solid;
    border-color: #d1d1d1;
    padding: 10px;
}
</style>