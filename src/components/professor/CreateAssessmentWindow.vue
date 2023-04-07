<template>
    <div style="margin: 40px">
        <div style="display: grid; grid-template-columns: 1fr 150px;">
            <textarea class="textbox" style="width: calc(100% - 50px)" v-model="title" placeholder="Title"></textarea>
            <textarea class="textbox" style="width: 100px" v-model="weight" placeholder="Mark"></textarea>
        </div>
        <div style="display: grid; grid-template-columns: 230px 230px 230px; margin-top: 20px">
            <textarea class="textbox" style="width: 220px" v-model="date" placeholder="Date (YYYY-MM-DD)"></textarea>
            <textarea class="textbox" style="width: 220px" v-model="time" placeholder="Time (HH:MM)"></textarea>
            <textarea class="textbox" style="width: 220px" v-model="duration" placeholder="Duration (minutes)"></textarea>

        </div>
        <div style = "width:100%; height: 2px; background-color: darkgray; margin-top:20px; border-radius: 1px;"></div>
        <div style="margin-top: 50px">
            <div v-for="question in questions" :key="question.number">
                <div style="display: grid; grid-template-columns: 5fr 1fr 65px 65px; margin-bottom: 15px">
                    <textarea class="questionbox" style="width: calc(100% - 20px)" v-model="questions[question.number-1].prompt" :placeholder="'Question ' + question.number"></textarea>
                    <textarea class="questionbox" style="width: 70px" v-model="questions[question.number-1].weight" :placeholder="'Mark'"></textarea>
                    <div class="hover">
                        <img style="margin: auto" @click="remove(question.number)" src="../../assets/delete.png" width="25" height="25"/>
                    </div>
                    <div class="hover">
                        <img style="margin: auto" @click="add(question.number)" src="../../assets/add.png" width="35" height="35"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

import { useStore } from 'vuex';

export default {
    name: "CreateAssessmentWindow",
    props: {
        questionObjects: {
            type: Array
        },
        submit: {
            type: Boolean
        },
        q: {
            type: String
        },
        n: {
            type: String
        },
        d: {
            type: String
        },
        t: {
            type: String
        },
        w: {
            type: String
        },
        l: {
            type: String
        },
    },
    watch: {
        submit() {
            this.$emit('questions', this.questions, this.title, this.weight, this.date, this.time, this.duration);
        },
        n() { this.title = this.n },
        t() { this.time = this.t },
        d() { this.date = this.d },
        l() { this.duration = this.l },
        w() { this.weight = this.w },
        q() { this.questions = this.q },

    },
    data() {
        return {
            store: null,
            questions: [{prompt: "", weight: "", number: 1}],
            title: '',
            weight: '',
            date: '',
            time: '',
            duration: ''
        }
    },
    components: {
    },
    methods: {
        add(number) {
            this.questions.splice(number, 0, {prompt: "", weight: "", number: number + 1})
            console.log(this.questions);
            this.questions = this.questions.map((q, i) => i > number ? {...q, number: q.number + 1} : q);
            this.store.state.setQuestions = this.questions;
            this.$emit('update', this.questions.length);

        },
        remove(number) {
            this.questions = this.questions.filter((_, i) => i != (number-1));
            this.questions = this.questions.map((q, i) => i >= number-1 ? {...q, number: q.number - 1} : q);
            this.store.state.setQuestions = this.questions;
            this.$emit('update', this.questions.length);
        }
    },
    created() {
        const store = useStore();
        this.store = store;
        this.title = this.n;
        this.weight = this.w;
        this.questions = this.q;
        this.date = this.d;
        this.time = this.t;
        this.duration = this.l;
    }
}
</script>

<style scoped>
*:focus {
    outline: none;
}
.textbox {
    width:500px;
    height:65px;
    padding: 15px;
    border-radius: 10px;
    font-size: 20px;
}


.questionbox {
    width:400px;
    height:50px;
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
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

.hover {
      margin: auto;
      width: 50px;
      height: 50px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      transition: all 0.2s ease-in;
      background-color: #d1d1d1;
    }
.hover:hover { 
    background: #adadad;
}
</style>