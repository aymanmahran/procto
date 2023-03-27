<template>
  <div class="assessment-window">
    <div>
      <div class="timer-box">
      <div style="width: 120px; margin:auto"><TimerWidget :time="time"/></div>
      </div>
      <AssessmentWindow @updateAnswers="updateAnswers" :questions="questions"/>
    </div>
    <div>
      <AssessmentSideBar @submit="submit" :name="name" :questions="questionsIndex"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AssessmentWindow from "@/components/student/AssessmentWindow.vue";
import AssessmentSideBar from "@/components/student/AssessmentSideBar.vue";
import TimerWidget from "@/components/student/TimerWidget.vue";
import { Assessment } from "procto-api";

export default {
  name: "AssessmentView",
  props: {
  },
  components: {
    AssessmentWindow,
    AssessmentSideBar,
    TimerWidget
  },
  data() {
    return {
      questions: [],
      questionsIndex: [],
      name: "",
      time: "",
      answers: []
    }
  },
  async created() {
      var assessment = new Assessment(this.id);
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