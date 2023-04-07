<template>
  <div class="assessment-window">
    <div>
      <CreateAssessmentWindow :q="q" :n="n" :w="w" :d="d" :t="t" :l="l" @questions="sendQuestions" @update="updateQuestions" :assessmentObject="assessmentObject" :submit="submit"/>
    </div>
    <div>
      <AssessmentSideBar @submit="send" :questions="questionsIndex"/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import CreateAssessmentWindow from "@/components/professor/CreateAssessmentWindow.vue";
import AssessmentSideBar from "@/components/student/AssessmentSideBar.vue";
import { useStore } from 'vuex';
import { AssessmentFactory } from "procto-api";
// import { store } from '../store';

export default {
  name: "AssessmentStudioView",
  props: {
    assessment: {
      type: String
    },
    student: {
      type: String
    }
  },
  components: {
    CreateAssessmentWindow,
    AssessmentSideBar
  },
  data() {
    return {
      store: null,
      assessmentObject: null,
      questionsIndex: [1],
      setQuestions: null,
      submit: false,
      n: '',
      t: '',
      d: '',
      q: [{prompt: '', weight: '', number: 1}],
      l: '',
      w: '',
      update: false
    }
  },
  async created() {
      const store = useStore();
      this.store = store;
      console.log(this.$route.query.id);
      if(this.$route.query.id) {
        this.update = true;
        this.assessmentObject = await AssessmentFactory.get(this.$route.query.id);
        const date = await this.assessmentObject.getStartDate();
        console.log(date);
        this.n = await this.assessmentObject.getTitle();
        this.w = await this.assessmentObject.getWeight();
        this.l = await this.assessmentObject.getDuration();
        this.l = Number(this.l) / 60;
        this.d = (new Date(Number(date) * 1000)).toLocaleString().split(',')[0].split('/').reverse().join("-");
        this.t = (new Date(Number(date) * 1000)).toLocaleString().split(',')[1].split(':').slice(0, 2).join(":");
        this.q = await this.assessmentObject.getQuestionsObj();
        console.log(this.q);
      }
      else {
        this.assessmentObject = await AssessmentFactory.newAssessment();
      }
  },
  methods: {
    send() {
      this.submit = true;
    },
    async sendQuestions(questions, title, weight, date, time, duration) {
      console.log(date, time);
      await this.assessmentObject.setTitle(title);
      await this.assessmentObject.setWeight(weight);
      await this.assessmentObject.setStartDate(Math.floor(new Date(date + " " + time).getTime() / 1000));
      await this.assessmentObject.setDuration(Number(duration) * 60);
      await this.assessmentObject.setQuestions(questions);
      const id = await this.assessmentObject.getId();
      if(!this.update) await this.store.state.selectedCourse.addAssessment(id);
      console.log(id);
      this.$router.push({name: 'home'});
    },
    updateQuestions(n) {
      this.questionsIndex = [];
      for(let i = 1; i <= n; i++) this.questionsIndex.push(i);
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