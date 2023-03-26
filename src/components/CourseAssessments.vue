<template>
    <div class="tabs_content">
        <slot />
    </div>
</template>

<script>

export default {
    name: "CourseAssessments",
    props: {
      title: {
        type: String
      }
    },
    data() {
    },
    methods: {
    }
  }
</script>

<style scoped>
.tabs_content {
    background-color: #d1d1d1;
    min-height: 300px;
    display: grid;
    place-items: center;
    border-radius: 0 0 5px 5px;
    padding: 10px;
}
</style>