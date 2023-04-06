import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import AssessmentView from "../views/AssessmentView.vue";
import AssessmentStudioView from "../views/AssessmentStudioView";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/take-assessment",
    name: "assessment",
    component: AssessmentView
  },
  {
    path: "/view-assessment",
    name: "viewassessment",
    component: AssessmentView
  },
  {
    path: "/new-assessment",
    name: "newassessment",
    component: AssessmentStudioView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
