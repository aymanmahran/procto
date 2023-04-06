<template>
    <div class="tabs_content" >
        <div class="table-header">
            <div style="text-align:left; margin-left: 50px"> First Name</div>
            <div style="text-align:left"> Last Name</div>
            <div style="text-align:center"> Email</div>
            <div style="text-align:right; margin-right: 50px"> Student ID</div>
        </div>
        <div v-if="selected == 0"> <StudentItem v-for="student in studentProps" :key="student.id" :student="student"></StudentItem> </div>
        <div style="width: 100%; margin-top: 25%;" v-else-if="selected == 1"> <LoadingWidget></LoadingWidget> </div>
    </div>
</template>

<script>

import StudentItem from './StudentItem.vue';
import LoadingWidget from '../shared/LoadingWidget.vue';
import { useStore } from "vuex";

export default {
    name: "CourseStudents",
    props: {
      course: {
        type: Object
        }
    },
    components: {
        StudentItem,
        LoadingWidget
    },
    watch: {
        async course() {
            this.selected = 1;
            this.studentsList = await this.course.getStudents();
            this.studentProps = [];
            for(let student of this.studentsList) {
                const firstname = await student.getFirstname();
                const lastname = await student.getLastname();
                const email = await student.getEmail();
                const id = await student.getId();

                this.studentProps.push({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    id: id
                });
            }
            this.selected = 0;
        }
    },
    data() {
        return {
            studentProps: [],
            studentsList:[],
            selected: 1
        }
    },
    methods: {
    },
    async created() {
        const store = useStore();
        this.user = store.state.user;
        store.state.students = [];
        this.selected = 1;
        this.studentsList = await this.course.getStudents();
        this.studentProps = [];
        for(let student of this.studentsList) {
            const firstname = await student.getFirstname();
            const lastname = await student.getLastname();
            const email = await student.getEmail();
            const id = await student.getId();

            this.studentProps.push({
                firstname: firstname,
                lastname: lastname,
                email: email,
                id: id
            });
        }
        this.selected = 0;
        store.state.students = this.studentProps;
        console.log(this.studentsList);
    }
  }
</script>

<style scoped>
.tabs_content {
    background-color: #fff;
    min-height: calc(100% - 170px);
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