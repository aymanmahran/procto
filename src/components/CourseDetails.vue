<template>
    <div class="tabs">
        <ul class="tabs_header">
            <li v-for="title in titles" :key="title" class="tabs_item" :class="{ selected: selectedTitle === title}" @click="selectTab(title)">
                {{ title }}
            </li>
        </ul>
    </div>
</template>

<script >
import { useSlots, ref , provide} from 'vue';
 export default {
    name: "CourseDetails",
    props: {
        titles: {
            type: Array,
        }
    },
    data() {
        return {
            slots: useSlots(),
            selectedTitle: this.titles[0]
        }
    },
    methods: {
        selectTab(title){
            //console.log(title);
            this.selectedTitle = title;
            this.$emit('selectTab', title);
        }
    },
    created() {
        provide('selectedTitle', ref(this.titles[0]));
    }
  }
</script>

<style scoped>
.tabs {
    max-width: 100%;
    margin: 0 auto;
}
.tabs_header {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    gap: 5px;
    height: 50px;
}
.tabs_item {
    flex: 1;
    background-color: #eee;
    padding: 5px 0;
    border-radius: 5px 5px 0 0;
    transition: .4s all ease-out;
    cursor: pointer;
    user-select: none;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top:5px;
}
.tabs_item.selected {
    background-color: #d1d1d1;
}
.tabs_content {
    background-color: #bfbfbf;
    min-height: 300px;
    display: grid;
    place-items: center;
    border-radius: 0 0 5px 5px;
    padding: 10px;
}
</style>