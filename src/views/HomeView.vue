<template>
  <div v-if="!isStudent" class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App Student" /> -->
    <div><SideBar :name = "user.username" :courses = "courses" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div><AssessmentList :assessments = "assessments"/></div>
  </div>
  <div v-else class="home">
    <div><SideBar :name = "user.username" :courses = "courses" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div style="margin:20px; margin-left:40px; margin-right:30px">
      <div class="courseTitle">
        <p> {{ selectedCourse }} </p>
      </div>
      <CourseDetails :titles="tabs" @selectTab="updateTabSelection"/>
      <CourseStudents title="Students" v-show="selectedTab == 'Students'"/>
      <CourseAssessments title="Assessments" v-show="selectedTab == 'Assessments'"/>

  </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App Prof" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import AssessmentList from "@/components/AssessmentList.vue";
import CourseStudents from "@/components/CourseStudents.vue";
import CourseAssessments from "@/components/CourseAssessments.vue";
import CourseDetails from "@/components/CourseDetails.vue";
import SideBar from "@/components/SideBar.vue";
import { User } from "procto-api";

export default {
  name: "HomeView",
  props: {
    email: String,
    user: Object,
    auth: Object
  },
  components: {
    AssessmentList,
    SideBar,
    CourseStudents,
    CourseAssessments,
    CourseDetails
  },
  data() {
    return {
      isStudent: false,
      courses: ['ECE 5500', 'ECE 5400'],
      assessments: [],
      tabs: ['Students', 'Assessments'],
      selectedCourse: "",
      selectedTab: ""
    }
  },
  methods: {
    updateCourseSelection(courseName) {
      this.selectedCourse = courseName;
      console.log(this.selectedCourse);
      var assessments = [
        {
          id: 1,
          name: 'Midterm 1',
          course: 'ECE 5500',
          date: 'March 20th, 2023',
          time: '12:30 PM',
          grade: 89
        }, 
        {
          id: 2,
          name: 'Quiz 3',
          course: 'ECE 5400',
          date: 'March 22th, 2023',
          time: '11:00 AM',
          grade: null
        }
      ];
      const interval = setInterval(() => {
        if (!assessments.length) {
          clearInterval(interval)
        } else {
          this.assessments.push(assessments.shift())
        }
      }, 200);
      //assessments.forEach(item => this.assessments.push(item));
    },
    updateTabSelection(tab) {
      console.log(tab);
      this.selectedTab = tab;
    },
    logout() {
      this.auth.signOut();
    }
  },
  async created() {
    var user = new User(this.email)
    this.isStudent = await user.getType() == "student";
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

</style>