<template>
    <textarea @click.right.prevent @paste="onCopyPaste" @copy="onCopyPaste" @copy.prevent @paste.prevent :readonly="!mutable" v-model="ans" @keyup="$emit('update', number, ans)" style="width:500px; height:200px; padding: 15px; border-radius: 10px;" placeholder="Answer"></textarea>
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
        },
        methods: {
            onCopyPaste(e) {
                console.log(e);
                alert("Copy/paste is not allowed!");
            }
        }
    }
</script>

<style scoped>

</style>
