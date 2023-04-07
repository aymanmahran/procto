<template>
    <div class="sidebar">
      <div class="top-rect">
        
        <div class="title">Hello, Ayman</div>
      </div>
      <div id="cam-box" v-if="isStudent" style="width:100%; height: 500px; background-color: #330000;">
        <video ref="camera" style = "margin-top: 30px;margin-left: 25px;" :width="220" :height="150" autoplay></video>
        <canvas id="photoTaken" ref="canvas" style = "margin-top: 30px;margin-left: 25px;" :width="220" :height="150"></canvas>
        <!-- <div style = "margin-top: 40px;margin-left: 25px; width: calc(100% - 50px); height: 150px; background-color: #000;"></div> -->
      </div>

      <div id="cam-box" v-else-if="mark" style="width:100%; height: 400px; background-color: #330000;">
        <ReportEntry report="Text copy/paste attempts:  1"></ReportEntry>
        <ReportEntry report="Window switching attempts:  1"></ReportEntry>
        <ReportEntry report="Face detection fail:  1"></ReportEntry>
      </div>

      <div class="questions-list">
        <QuestionEntry @goTo="goTo" v-for="question in questions" :key="question" :questionNumber="question"></QuestionEntry>
      </div>
      <div class="button" @click="submit">Submit</div>

    </div>
  </template>
  
  <script>
  import QuestionEntry from '../shared/QuestionEntry.vue';
  import ReportEntry from '../shared/ReportEntry.vue';
  import { useStore } from 'vuex';
  import * as faceapi from 'face-api.js';
  
  export default {
    name: "AssessmentSideBar",
    props: {
      name: {
        type: String,
      },
      questions: {
        type: Array,
      },
      mark: {
        type: Boolean
      }
    },
    components: {
      QuestionEntry,
      ReportEntry
    },
    data() {
      return {
        isStudent: true,
        faceDetectInterval: null,
        videoStream: null
      }
    },
    async created() {
      const store = useStore();
      this.isStudent = store.state.isStudent;
      if(this.isStudent) {
        const constraints = (window.constraints = {
          audio: false,
          video: true
        });

        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
            this.videoStream = stream;
            this.isLoading = false;
            this.$refs.camera.srcObject = stream;
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
            alert("Camera access was not allowed!");
          });

        var alerted = false, time = 0;
        
        setTimeout(() => {
            const video = this.$refs.camera;
            // const canvas = faceapi.createCanvasFromMedia(video)
            var canvas = this.$refs.canvas;
            const displaySize = { width: video.width, height: video.height }
            faceapi.matchDimensions(canvas, displaySize)
            this.faceDetectInterval = setInterval(async () => {
              const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
              const resizedDetections = faceapi.resizeResults(detections, displaySize)
              console.log(detections.length);
              if(detections.length == 0) time += 100;
              if(time > 5000 && !alerted) {
                alerted = true;
                alert("This is an alert that no face has been detected for longer than 5 seconds. Suspected behaviour will be reported.");
                time = 0;
                alerted = false;
              }
              canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
              faceapi.draw.drawDetections(canvas, resizedDetections);
            }, 100);
          }, 3000);  
      }

    },
    methods: {
      submit() {
        if(this.isStudent) {
          clearInterval(this.faceDetectInterval);
          this.videoStream.getTracks().forEach(track => track.stop());
        }
        this.$emit('submit');
      },
      goTo(number) {
        this.$emit('goTo', number);
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    background-color: #7a0000;
    position: fixed;
    height: 100%;
    min-height: min-content;
    width: 270px;
    transition: all 0.5s ease;
  }
  
  .top-rect {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #330000;
    height: 150px;
  }

  .title {
    display: flex;
    font-size: 28px;
    font-weight: bold;
    height: 40px;
    color: #fff;
    text-align: center;
    flex-grow: 1;
    margin-left: -15px; 
    align-items: center;
    justify-content:center;
  }
  
  .button {
    display: flex;
    min-height: 40px;
    font-size: 14px;
    width: calc(100% - 50px);
    color: rgb(218, 218, 218);
    border-radius: 7px;
    background-color:#330000;
    align-items: center;
    justify-content:center;
    cursor: pointer;
    transition: all .15s ease-in;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .button:hover { 
      background: #953333;
  }

  .questions-list {
    height: calc(100% - 70px);
    margin-top: 50px;
  }

  #cam-box {
    position: relative;
  }
  #cam-box canvas, video {
    position: absolute;
  }

  </style>
  