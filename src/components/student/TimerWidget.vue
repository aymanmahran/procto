<template>
    <div>
        <div v-if="currentTime">
            {{ format(currentTime) }}
        </div>
      <div v-if="!currentTime">
       00:00:00
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TimerWidget",
    props: {
      time: {
        type: String,
      }
    },
    data() {
      return {
        currentTime: Number(this.time)
      };
    },
    created() {
        this.currentTime = Number(this.time);
        setTimeout(this.setTime, 1000);
    },
    unmounted() {
      clearTimeout(this.interval);
    },
    methods: {
      format(value) {
        var formattedTime = "";
        var hours = Math.floor(value / 60 / 60);
        if (hours < 10) {
          hours = "0" + hours;
        }

        var minutes = Math.floor((value - hours * 60 * 60) / 60 );
        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        var seconds = Math.floor((value - hours * 60 * 60 - minutes * 60) );
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        formattedTime = hours + ":" + minutes + ":" + seconds;
        return formattedTime;
      },
      setTime(){
        this.currentTime = Number(this.time);
        setTimeout(this.countdown, 1000);
      },
      countdown() {
        console.log(this.currentTime);
        this.currentTime--;
        if (this.currentTime > 0) {
          this.interval = setTimeout(this.countdown, 1000);
        } else {
          this.currentTime = null;
        }
      }
    }
  }
  </script>

<style scoped>
    div {
        font-size: 30px;
        font-weight: bold;
    }
</style>