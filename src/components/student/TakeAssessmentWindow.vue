<template>
    <div style="margin: 40px">
        <div v-for="question in questions" :key="question.number">
            <SimpleQuestion :mutable="true" @update="update" :questionProps="question"/>
        </div>
    </div>
</template>

<script>

import SimpleQuestion from '../shared/SimpleQuestion.vue';

export default {
    name: "TakeAssessmentWindow",
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
    },
    unmounted() {
        window.onfocus = window.onblur = window.onpageshow = window.onpagehide = null;
    },
    created() {
        var inView = false;
        var done = false;
        window.onfocus = window.onblur = window.onpageshow = window.onpagehide = (e) => {
            if ({ focus: 1, pageshow: 1 }[e.type]) {
                if (inView) return;
                //this.tabFocus = true;
                inView = true;
            } else if (inView) {
                //this.tabFocus = !this.tabFocus;
                inView = false;
                if(!done) alert("Window switching is not allowed!");
                done = true;
            }
        };
    }
}
</script>

<style scoped>

</style>