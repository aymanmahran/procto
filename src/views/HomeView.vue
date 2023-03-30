<template>
  <div v-if="isStudent" class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App Student" /> -->
    <div><SideBar :name = "user.username" :courses = "courses" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div v-if="selectedCourseObject != null"><AssessmentList :assessments = "assessments"/></div>
    <div v-else style="color: #d1d1d1; margin:20px; margin-left:40px; margin-right:30px;font-size: 24px; font-weight: bold"> Select a course to view assessments information...</div>
  </div>
  <div v-else class="home">
    <div><SideBar :name = "user.username" :courses = "courses" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div v-if="selectedCourseObject != null" style="margin:20px; margin-left:40px; margin-right:30px">
      <div class="courseTitle">
        <p> {{ selectedCourse }} </p>
      </div>
      <CourseDetails :titles="tabs" @selectTab="updateTabSelection"/>
      <CourseStudents :course="selectedCourseObject" title="Students" v-show="selectedTab == 'Students'"/>
      <CourseAssessments :course="selectedCourseObject" title="Assessments" v-show="selectedTab == 'Assessments'"/>
  </div>
  <div v-else style="color: #d1d1d1; margin:20px; margin-left:40px; margin-right:30px;font-size: 24px; font-weight: bold"> Select a course to view information...</div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App Prof" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import AssessmentList from "@/components/student/AssessmentList.vue";
import CourseStudents from "@/components/professor/CourseStudents.vue";
import CourseAssessments from "@/components/professor/CourseAssessments.vue";
import CourseDetails from "@/components/professor/CourseDetails.vue";
import SideBar from "@/components/shared/SideBar.vue";
import { User, Student, Professor, userType } from "procto-api";
import { useStore } from 'vuex';
// import { store } from "../store";
// import { provide } from "vue";

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
    CourseDetails
  },
  data() {
    return {
      userObj: null,
      isStudent: false,
      courses: [],
      courseObjects: [],
      assessments: [],
      tabs: ['Students', 'Assessments'],
      selectedCourse: "",
      selectedCourseObject: null,
      selectedTab: ""
    }
  },
  methods: {
    updateCourseSelection(courseName) {
      this.selectedCourse = courseName;
      this.selectedCourseObject = this.courseObjects.filter(course => course.getTitle() == this.selectedCourse)[0];
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
  async setup(){
    const store = useStore();
    var user = new User("Ayman", "Mahran", "agazmahran@mun.ca");
    console.log(await user.getType());
    console.log(userType.Student);
    if (await user.getType() == userType.Student) {
      store.state.user = new Student(user);
      store.state.isStudent = true;
    }
    else {
      store.state.user = new Professor(user);
      store.state.isStudent = false;
    }
  },
  async created() {
    const store = useStore();
    var user = new User("Ayman", "Mahran", "agazmahran@mun.ca");
    this.isStudent = store.state.isStudent;
    // this.isStudent = await user.getType() == userType.Student;
    if( store.state.isStudent ) {
      user = new Student(user, "202045746");
    }
    else {
      user = new Professor(user);
    }
    this.courseObjects = await user.getCourses();
    console.log("Fsdfsd");
    console.log(this.courseObjects);
    //console.log(await this.auth.userAttributes(this.user));
    this.courses = this.courseObjects.map(course => course.getTitle());
    console.log(this.courses);
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