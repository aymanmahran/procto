<template>
  <div v-if="isStudent" class="home">
    <div><SideBar :name = "name" :courses = "courseTitles" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div v-if="selected == 2"><AssessmentList :courseTitle = "selectedCourse" :pastAssessments = "pastAssessments" :upcomingAssessments = "upcomingAssessments"/></div>
    <div v-else-if="selected == 1"> <LoadingWidget></LoadingWidget> </div>    
    <div v-else-if="selected == 0"> <div style="color: #d1d1d1; margin:20px; margin-left:40px; margin-right:30px;font-size: 24px; font-weight: bold"> Select a course to view assessments information...</div> </div>
  </div>
  <div v-else class="home">
    <div><SideBar :name = "name" :courses = "courseTitles" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div v-if="selected == 2" style="margin-top: 40px; margin-left:40px; margin-right:30px">
      <div style="display: grid; grid-template-columns: 1fr 160px 160px; height:70px">
        <div class="courseTitle">
          {{ selectedCourse }}
        </div>
        <div class="button" @click="addStudent">Add Student</div>
        <div class="button" @click="this.$router.push({name: 'newassessment'});">Add Assessment</div>
      </div>
      <CourseDetails :titles="tabs" @selectTab="updateTabSelection"/>
      <CourseStudents :course="selectedCourseObject" :update="update" title="Students" v-show="selectedTab == 'Students'"/>
      <CourseAssessments :course="selectedCourseObject" title="Assessments" v-show="selectedTab == 'Assessments'"/>
    </div>
    <div v-else-if="selected == 1"> <LoadingWidget></LoadingWidget> </div>
    <div v-else-if="selected == 0" style="color: #d1d1d1; margin:20px; margin-left:40px; margin-right:30px;font-size: 24px; font-weight: bold"> Select a course to view information...</div>
    </div>
</template>

<script>
// @ is an alias to /src
import AssessmentList from "@/components/student/AssessmentList.vue";
import CourseStudents from "@/components/professor/CourseStudents.vue";
import CourseAssessments from "@/components/professor/CourseAssessments.vue";
import CourseDetails from "@/components/professor/CourseDetails.vue";
import SideBar from "@/components/shared/SideBar.vue";
import LoadingWidget from "@/components/shared/LoadingWidget.vue";
import { ProctoAPI, User, Student, Professor } from "procto-api";
import { useStore } from 'vuex';
import { API } from "aws-amplify";

export default {
  name: "HomeView",
  props: {
    user: Object,
    auth: Object
  },
  components: {
    AssessmentList,
    SideBar,
    CourseStudents,
    CourseAssessments,
    CourseDetails,
    LoadingWidget
  },
  data() {
    return {
      store: null,
      name: '',
      userObj: null,
      isStudent: false,
      courseTitles: [],
      courseObjects: [],
      courseMap: null,
      pastAssessments: [],
      upcomingAssessments: [],
      tabs: ['Students', 'Assessments'],
      selectedCourse: "",
      selectedCourseObject: null,
      selectedTab: "",
      selected: 0,
      update: false
    }
  },
  methods: {
    async updateCourseSelection(courseName) {
      console.log(courseName);

      this.selected = 1;
      this.store.state.students = [];

      this.pastAssessments = [];
      this.upcomingAssessments = [];
      this.selectedCourse = courseName;
      this.selectedCourseObject = this.courseMap.get(courseName);

      this.store.state.selectedCourse = this.selectedCourseObject;
      
      if(!this.isStudent) {
        this.selected = 2;
        return;
      }

      const pastAssessmentObjects = await this.selectedCourseObject.getPastAssessments();
      const upcomingAssessmentObjects = await this.selectedCourseObject.getUpcomingAssessments();

      for (let assessment of pastAssessmentObjects) {
        const id = await assessment.getId();
        const title = await assessment.getTitle();
        const date = await assessment.getStartDate();
        const grade = await assessment.getFinalMark();
        const weight = await assessment.getWeight();
        
        const obj = {
          assessment: assessment,
          id: id,
          title: title,
          course: this.selectedCourse,
          weight: weight,
          grade: grade,
          timestamp: date,
          date: (new Date(date * 1000)).toDateString(),
          time: (new Date(date * 1000)).toLocaleString().split(',')[1].split(':').slice(0, 2).join(":")
        };

        this.pastAssessments.push(obj);
      }

      for (let assessment of upcomingAssessmentObjects) {
        const id = await assessment.getId();
        const title = await assessment.getTitle();
        const date = await assessment.getStartDate();
        
        const obj = {
          assessment: assessment,
          id: id,
          title: title,
          course: this.selectedCourse,
          grade: undefined,
          timestamp: date,
          date: (new Date(date * 1000)).toDateString(),
          time: (new Date(date * 1000)).toLocaleString().split(',')[1].split(':').slice(0, 2).join(":")
        };

        this.upcomingAssessments.push(obj);
      }

      this.pastAssessments = this.pastAssessments.sort((a, b) => a.timestamp - b.timestamp);
      this.upcomingAssessments = this.upcomingAssessments.sort((a, b) => a.timestamp - b.timestamp);

      this.selected = 2;

      console.log(this.selectedCourse);
    },
    updateTabSelection(tab) {
      console.log(tab);
      this.selectedTab = tab;
    },
    async addStudent() {
      let student = prompt("Please enter student email", "");
      if (student == null || student == "") {
        return;
      }
      else {
        console.log(student);
        await this.selectedCourseObject.addStudent(student);
        this.update = !this.update;
        //await this.updateCourseSelection(this.selectedCourse);
      }
    },
    logout() {
      this.auth.signOut();
    }
  },
  async setup(props){
    const store = useStore();
    ProctoAPI.Config(API);

    var user = new User(props.user.attributes.email);

    if (await user.getType() == 'student') {
      store.state.user = new Student(user);
      store.state.isStudent = true;
    }

    else if (await user.getType() == 'professor') {
      store.state.user = new Professor(user);
      store.state.isStudent = false;
    }

    else {
      let id = null;
      while (id == null || id == "")
        id = prompt("Please enter your ID:", "");
      
      store.state.user = new Student(user);
      store.state.isStudent = true;
      await user.update(props.user, 'student', id);
    }

    store.state.courseObjects = await store.state.user.getCourses();

    store.state.courseTitles = [];
    store.state.courseMap = new Map();
    const arr = new Array();
    for(let course of store.state.courseObjects){
        const title = await course.getTitle();
        arr.push(title);
        store.state.courseMap.set(title, course);
    }
    store.state.courseTitles = arr.sort((a, b) => a.localeCompare(b));
  },
  async created() {
    const store = useStore();
    this.store = store;
    console.log(store.state.visible);
    this.isStudent = store.state.isStudent;
    this.courseObjects = store.state.courseObjects;
    this.courseTitles = store.state.courseTitles;
    this.name = this.user.attributes.given_name.split(' ')[0];
    store.state.username = this.user.attributes.email;
    this.courseMap = store.state.courseMap;
    console.log(this.courseTitles);
  }
};
</script>

<style scoped>

.home {
  display: grid;
  grid-template-columns: 270px 1fr;

  font-family:Ubuntu;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  
}

.courseTitle {
    font-size: 28px;
    font-weight: bold;
    height: 40px;
    color: #000;
    margin-bottom: 10px;
  }

  .button {
    display: flex;
    height: 40px;
    font-size: 16px;
    width: 150px;
    color: #2c3f55;
    font-weight: bold;
    border-radius: 7px;
    background-color:#d1d1d1;
    align-items: center;
    justify-content:center;
    cursor: pointer;
    transition: all .15s ease-in;
    margin: 0 auto;
  }

  .button:hover { 
      background: #a0a0a0;
  }
</style>