import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import CatalogView from "@/views/CatalogView.vue";
import { Catalog } from "@/router/routes/Catalog";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      breadcrumb: "Главная",
    },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
    meta: {
      breadcrumb: "Тестовая страница",
    },
  },
  Catalog,
  {
    path: "/:catchAll(.*)*",
    name: "error",
    component: ErrorView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
