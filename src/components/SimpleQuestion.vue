<template>
    <div :id="questionProps.number" :v-el="questionProps.number" style="margin-bottom: 50px;">
        <h2> {{ `Question ${questionProps.number}` }}</h2>
        <p style="font-size:20px"> {{ questionProps.prompt }}</p>
        <LongAnswerQuestion @update="update" :number="questionProps.number" v-if="questionProps.type === 'long-answer'"/>
        <MultipleChoiceQuestion :options="questionProps.options" :number="questionProps.number" v-else-if="questionProps.type === 'multiple-choice'"/>

    </div>
</template>

<script>
    import LongAnswerQuestion from './LongAnswerQuestion.vue';
    import MultipleChoiceQuestion from './MultipleChoiceQuestion.vue';

    export default {
        name: 'SimpleQuestion',
        props: {
            questionProps: {
                type: Object
            }
        },
        components: {
            LongAnswerQuestion,
            MultipleChoiceQuestion
        },
        methods: {
            update(number, ans) {
                this.$emit('update', number, ans);
            }
        }
    }
</script>

<style scoped>
</style>
