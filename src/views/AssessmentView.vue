<template>
  <div class="assessment-window" v-if="isStudent">
    <div>
      <div class="timer-box">
      <div style="width: 120px; margin:auto"><TimerWidget :time="time.toString()"/></div>
      </div>
      <TakeAssessmentWindow @updateAnswers="updateAnswers" :questions="questions" :questionObjects="questionObjects"/>
    </div>
    <div>
      <AssessmentSideBar @submit="submit" :name="name" :questions="questionsIndex"/>
    </div>
  </div>

  <div class="assessment-window" v-else>
    <div>
      <MarkAssessmentWindow @updateAnswers="updateAnswers" :questions="questions" :questionObjects="questionObjects"/>
    </div>
    <div>
      <AssessmentSideBar @submit="submit" :name="name" :questions="questionsIndex"/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import TakeAssessmentWindow from "@/components/student/TakeAssessmentWindow.vue";
import MarkAssessmentWindow from "@/components/professor/MarkAssessmentWindow.vue";
import AssessmentSideBar from "@/components/student/AssessmentSideBar.vue";
import TimerWidget from "@/components/student/TimerWidget.vue";
import { useStore } from 'vuex';
// import { store } from '../store';

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
      questionObjects: [],
      questionsIndex: [],
      name: "",
      time: "",
      answers: [],
      isStudent: true,
      currentAssessment: null
    }
  },
  async created() {
      const store = useStore();

      let assessment = store.state.selectedAssessment;

      if(!store.state.isStudent) {
        console.log(this.$route.query.assessment, this.$route.query.student);
        assessment = await store.state.selectedCourse.getMarkableAssessment(this.$route.query.assessment, this.$route.query.student);
      }
        this.currentAssessment = assessment;
        this.isStudent = store.state.isStudent;
        this.time = await assessment.getDuration();
        this.questionObjects = await assessment.getQuestions();
        this.name = await assessment.getTitle();

        this.questions = [];
        let i = 1;
        let answer = '';

        for(let question of this.questionObjects) {
          const prompt = await question.getPrompt();
          const type = await question.getType();
          const weight = await question.getWeight();
          if(!store.state.isStudent)
            answer = await question.getAnswer();

          this.questions.push({
            number: i,
            prompt: prompt,
            type: type,
            answer: answer,
            weight: weight
          })
          this.questionsIndex.push(i);
          i++;
        }

        this.answers = new Array(this.questionsIndex.length + 1);

        if(store.state.isStudent)
          await assessment.startAssessment();

        console.log(this.questionObjects);
      
  },
  methods: {
    async submit() {
      if(this.isStudent) await this.currentAssessment.submitAssessment();
      else await this.currentAssessment.submitMarks();
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