<template>
    <div class="tabs_content" >
        <div class="table-header">
            <div style="text-align:left; margin-left: 50px"> First Name</div>
            <div style="text-align:left"> Last Name</div>
            <div style="text-align:center"> Email</div>
            <div style="text-align:right; margin-right: 50px"> Student ID</div>
        </div>
        <StudentItem v-for="student in studentsList" :key="student.id" :student="student"></StudentItem>
    </div>
</template>

<script>

import StudentItem from './StudentItem.vue';
import { store } from "../../store";

export default {
    name: "CourseStudents",
    props: {
      course: {
        type: String
        }
    },
    components: {
        StudentItem
    },
    data() {
        return {
            studentsList: [],
            user: null
        }
    },
    methods: {
    },
    async created() {
        this.user = store.user;
        console.log(store.set);
        this.studentsList = await this.user.getStudents(this.course);
    }
  }
</script>

<style scoped>
.tabs_content {
    background-color: #fff;
    min-height: calc(100% - 150px);
    /* display: grid; */
    /* place-items: top; */
    border-radius: 0 0 5px 5px;
    border-style: solid;
    border-color: #d1d1d1;
    padding: 10px;
}

.table-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* width:calc(100% - 0px); */
    height: 60px;
    font-size: 18px;
    font-weight: bold;
    color: #2c3f55;
    /* border-radius: 15px; */
    background-color: #d1d1d1;
    align-items: center;
    justify-content:center;
    transition: all .15s ease-in;
    margin-bottom: 5px;
    margin-left: -10px;
    margin-top: -10px;
    margin-right: -10px;
    /* cursor: pointer; */
}
</style>