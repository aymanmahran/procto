<template>
    <div style="margin: 40px">
        <div v-for="question in questions" :key="question.number">
            <SimpleQuestion :mutable="false" :questionProps="question"/>
            <div class="grade-box">
                <input type="text" v-model="marks[question.number]" @keyup="update(question.number)" rows="1" class="grade-input"/>
                <div class="grade-weight"> {{ question.weight }} </div>
            </div>
        </div>
    </div>
</template>

<script>

import SimpleQuestion from '../shared/SimpleQuestion.vue';

export default {
    name: "MarkAssessmentWindow",
    props: {
        questions: {
            type: Array
        },
        questionObjects: {
            type: Array
        }
    },
    data() {
        return {
            marks: []
        }
    },
    components: {
        SimpleQuestion
    },
    methods: {
        async update(number) {
            console.log(number);
            await this.questionObjects[number - 1].setMark(this.marks[number]);
            console.log(this.marks[number]);
            //this.$emit('updateMarks', this.marks);
        }
    }
}
</script>

<style scoped>
*:focus {
    outline: none;
}

.grade-box {
    display: grid;
    width: 100px;
    grid-template-columns: 50px 50px;
    border-radius: 10px;
    border-width: 2px;
    border-style: solid;
    border-color: #303030;
    margin-top: -20px;
    margin-bottom: 50px;
}
.grade-input {
    border: none;
    border-width: 0;
    box-shadow: none;
    width:50px;
    height:35px;
    padding: 10px;
    border-radius: 10px;
    font-weight: 18px
}

.grade-weight {
    text-align: center;
    margin: auto;
    margin-left: -5px;
    border-left: 1px solid #303030;
    width: 100%;
    font-weight: bold;
    border-width: 2px;
    font-size: 18px;
}
</style>