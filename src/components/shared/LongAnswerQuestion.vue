<template>
    <textarea v-model="ans" @keyup="$emit('update', number, ans)" style="width:500px; height:200px; padding: 15px; border-radius: 10px;" placeholder="Answer"></textarea>
</template>

<script>
    export default {
        name: "LongAnswerQuestion",
        props: {
            number: {
                type: String
            }
        },
        data() {
            return {
                ans: ""
            };
        }
    }
</script>

<style scoped>

</style>
