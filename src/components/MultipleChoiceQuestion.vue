<template>
    <div style = "margin-bottom: 15px;" v-for="option in options" :key="option.number">
        <input style="margin-right: 15px;width:18px; height:18px;" type="checkbox" :id="option.number" />
        <label style="font-size:18px;" for="checkbox">{{ option.text }}</label>
    </div>

</template>

<script>
    export default {
        name: "MultipleChoiceQuestion",
        props: {
            options: {
                type: Array
            },
            number: {
                type: String
            }
        }
    }
</script>

<style scoped>

</style>
