<template>
  <div class="assessment-window" v-if="isStudent">
    <div>
      <div class="timer-box">
      <div style="width: 120px; margin:auto"><TimerWidget :time="time"/></div>
      </div>
      <TakeAssessmentWindow @updateAnswers="updateAnswers" :questions="questions"/>
    </div>
    <div>
      <AssessmentSideBar @submit="submit" :name="name" :questions="questionsIndex"/>
    </div>
  </div>

  <div class="assessment-window" v-else>
    <div>
      <MarkAssessmentWindow @updateAnswers="updateAnswers" :questions="questions"/>
    </div>
    <div>
      <AssessmentSideBar @submit="submit" :name="name" :questions="questionsIndex"/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import TakeAssessmentWindow from "@/components/student/TakeAssessmentWindow.vue";
import MarkAssessmentWindow from "@/components/student/MarkAssessmentWindow.vue";
import AssessmentSideBar from "@/components/student/AssessmentSideBar.vue";
import TimerWidget from "@/components/student/TimerWidget.vue";
import { Assessment } from "procto-api";
import { store } from '../store';

export default {
  name: "AssessmentView",
  props: {
    assessment: {
      type: String
    },
    student: {
      type: String
    }
  },
  components: {
    TakeAssessmentWindow,
    MarkAssessmentWindow,
    AssessmentSideBar,
    TimerWidget
  },
  data() {
    return {
      questions: [],
      questionsIndex: [],
      name: "",
      time: "",
      answers: [],
      isStudent: true
    }
  },
  async created() {
      this.isStudent = store.isStudent;
      var assessment = new Assessment("Midterm 1");
      this.time = await assessment.getDuration();
      console.log(this.time);
      this.questions = await assessment.getQuestions();
      this.name = await assessment.getName();
      this.questionsIndex = this.questions.map(question => question.number);
      this.answers = new Array(this.questionsIndex.length);
  },
  methods: {
    submit() {
      this.$router.push({name: 'home'});
    },
    updateAnswers(answers) {
      this.answers = answers;
      console.log(answers);
    }
  }
};
</script>

<style scoped>

.assessment-window {
  display: grid;
  grid-template-columns: 1fr 270px;

  font-family:Ubuntu;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  
}

.timer-box {
  display: flex;
  width:calc(100% - 50px);
  height: 60px;
  background-color: rgb(218, 218, 218);
  border-radius: 15px;
  align-items: center;
  justify-content:center;
  margin-left: 20px;
  margin-top: 20px;
}

</style>