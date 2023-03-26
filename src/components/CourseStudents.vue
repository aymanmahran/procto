<template>
    <div class="tabs_content" >
        <StudentItem v-for="student in studentsList" :key="student.id" :student="student"></StudentItem>
    </div>
</template>

<script>

import StudentItem from './StudentItem.vue';

export default {
    name: "CourseStudents",
    props: {
      students: {
        type: Object
        }
    },
    components: {
        StudentItem
    },
    data() {
        return {
            studentsList: []
        }
    },
    methods: {
    },
    created() {
        console.log(this.selectedTab);
        this.studentsList=[{
            firstname: "Ayman",
            lastname: "Mahran",
            email: "agazmahran@mun.ca",
            id: "202045746"
        }]
    }
  }
</script>

<style scoped>
.tabs_content {
    background-color: #fff;
    min-height: 300px;
    display: grid;
    place-items: center;
    border-radius: 0 0 5px 5px;
    border-style: solid;
    border-color: #d1d1d1;
    padding: 10px;
}
</style>