<template>
    <div class="report-entry">
      {{ report }}
    </div>
  </template>
  
  <script>
  export default {
    name: "ReportEntry",
    props: {
      report: {
        type: String,
      }
    },
    methods: {
     
    }
  }
  </script>
  
<style scoped>
    .report-entry {
        display: flex;
        width:calc(100% - 30px);
        height: 50px;
        font-size: 16px;
        color: rgb(218, 218, 218);
        border-radius: 15px;
        background-color: 7a0000;
        align-items: center;
        justify-content:center;
        transition: all .15s ease-in;
        margin-bottom: 5px;
        margin-left: 15px;
        margin-right: 10px;
        cursor: pointer;
    }

    .report-entry:hover { 
        background: #953333;
    }
</style>