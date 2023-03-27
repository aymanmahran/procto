import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import AssessmentView from "../views/AssessmentView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
