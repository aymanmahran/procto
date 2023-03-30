<template>
    <div :id="questionProps.number" :v-el="questionProps.number" style="margin-bottom: 50px;">
        <h2> {{ `Question ${questionProps.number}` }}</h2>
        <p style="font-size:20px" @click.right.prevent @paste="onCopyPaste" @copy="onCopyPaste" @copy.prevent @paste.prevent> {{ questionProps.prompt }}</p>
        <LongAnswerQuestion @update="update" :number="questionProps.number" :mutable="mutable" :answer="questionProps.answer" v-if="questionProps.type === 'long-answer'"/>
        <MultipleChoiceQuestion :options="questionProps.options" :number="questionProps.number" :mutable="mutable" :answer="questionProps.answer" v-else-if="questionProps.type === 'multiple-choice'"/>

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
            },
            mutable: {
                type: Boolean
            }
        },
        components: {
            LongAnswerQuestion,
            MultipleChoiceQuestion
        },
        methods: {
            update(number, ans) {
                this.$emit('update', number, ans);
            },
            onCopyPaste(e) {
                console.log(e);
                alert("Copy/paste is not allowed!");
            }
        },
        created() {
            console.log(this.mutable);
        }
    }
</script>

<style scoped>
</style>
