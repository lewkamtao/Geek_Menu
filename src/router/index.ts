import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import Index from "../views/Index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Geek Menu",
    },
  },
  {
    path: "/Index",
    name: "Index",
    component: Index,
    meta: {
      title: "Geek Menu",
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(""),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
