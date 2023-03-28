<template>
    <textarea :readonly="!mutable" v-model="ans" @keyup="$emit('update', number, ans)" style="width:500px; height:200px; padding: 15px; border-radius: 10px;" placeholder="Answer"></textarea>
</template>

<script>
    export default {
        name: "LongAnswerQuestion",
        props: {
            number: {
                type: String
            },
            mutable: {
                type: Boolean
            },
            answer: {
                type: String
            }
        },
        data() {
            return {
                ans: this.mutable ? "" : this.answer
            };
        }
    }
</script>

<style scoped>

</style>
