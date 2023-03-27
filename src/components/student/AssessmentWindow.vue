<template>
    <div style="margin: 40px">
        <div v-for="question in questions" :key="question.number">
            <SimpleQuestion @update="update" :questionProps="question"/>
        </div>
    </div>
</template>

<script>

import SimpleQuestion from '../shared/SimpleQuestion.vue';

export default {
    name: "AssessmentWindow",
    props: {
        questions: {
            type: Array
        }
    },
    data() {
        return {
            timer: 0,
            answers: []
        }
    },
    components: {
        SimpleQuestion
    },
    methods: {
        update(number, ans) {
            console.log(number);
            this.answers[Number(number)] = ans;
            this.$emit('updateAnswers', this.answers);
        }
    }
}
</script>

<style scoped>

</style>