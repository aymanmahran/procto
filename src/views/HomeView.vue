<template>
  <div v-if="isStudent" class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App Student" /> -->
    <div><SideBar :name = "user.username" :courses = "courseTitles" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div v-if="selected == 2"><AssessmentList :courseTitle = "selectedCourse" :assessmentObjects = "assessments"/></div>
    <div v-else-if="selected == 1"> <LoadingWidget></LoadingWidget> </div>    
    <div v-else-if="selected == 0"> <div style="color: #d1d1d1; margin:20px; margin-left:40px; margin-right:30px;font-size: 24px; font-weight: bold"> Select a course to view assessments information...</div> </div>
  </div>
  <div v-else class="home">
    <div><SideBar :name = "user.username" :courses = "courseTitles" @selectCourse="updateCourseSelection" @logout="logout"/></div>
    <div v-if="selected == 2" style="margin:20px; margin-left:40px; margin-right:30px">
      <div class="courseTitle">
        <p> {{ selectedCourse }} </p>
      </div>
      <CourseDetails :titles="tabs" @selectTab="updateTabSelection"/>
      <CourseStudents :course="selectedCourseObject" title="Students" v-show="selectedTab == 'Students'"/>
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
    CourseDetails,
    LoadingWidget
  },
  data() {
    return {
      userObj: null,
      isStudent: false,
      courseTitles: [],
      courseObjects: [],
      assessments: [],
      tabs: ['Students', 'Assessments'],
      selectedCourse: "",
      selectedCourseObject: null,
      selectedTab: "",
      selected: 0
    }
  },
  methods: {
    async updateCourseSelection(courseName) {
      this.selected = 1;

      this.selectedCourse = courseName;
      this.courseTitles.forEach((course, i) => {
        if(course == courseName)
        this.selectedCourseObject = this.courseObjects[i]
      });

      this.assessments = await this.selectedCourseObject.getAssessments();

      // console.log(this.assessments);

      this.selected = 2;

      console.log(this.selectedCourse);

      // var assessments = [
      //   {
      //     id: 1,
      //     name: 'Midterm 1',
      //     course: 'ECE 5500',
      //     date: 'March 20th, 2023',
      //     time: '12:30 PM',
      //     grade: 89
      //   }, 
      //   {
      //     id: 2,
      //     name: 'Quiz 3',
      //     course: 'ECE 5400',
      //     date: 'March 22th, 2023',
      //     time: '11:00 AM',
      //     grade: null
      //   }
      // ];
      // const interval = setInterval(() => {
      //   if (!assessments.length) {
      //     clearInterval(interval)
      //   } else {
      //     this.assessments.push(assessments.shift())
      //   }
      // }, 200);
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
  async setup(props){
    const store = useStore();
    ProctoAPI.Config(API);

    var user = new User(props.user.attributes.email);

    if (await user.getType() == 'student') {
      store.state.user = new Student(user);
      store.state.isStudent = true;
      // await user.update(props.user, 'student', await store.state.user.getId());
    }

    else if (await user.getType() == 'professor') {
      store.state.user = new Professor(user);
      store.state.isStudent = false;
      // await user.update(this.user, 'professor', undefined);
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
    
    // console.log("Course", this.courseObjects);

    // console.log("Atts", JSON.stringify(this.user.attributes));

    store.state.courseTitles = [];
    store.state.courseObjects.forEach(async (course) => {
        const title = await course.getTitle();
        store.state.courseTitles.push(title);
    });
    
  },
  async created() {
    const store = useStore();
    this.isStudent = store.state.isStudent;
    this.courseObjects = store.state.courseObjects;
    this.courseTitles = store.state.courseTitles;
    store.state.username = this.user.attributes.email;

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