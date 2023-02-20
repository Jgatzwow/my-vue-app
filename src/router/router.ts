import Main from "@/pages/Main.vue";
import { createRouter, createWebHistory } from "vue-router";
import PostPage from "@/pages/PostsPage.vue";
import PostsPage from "@/pages/PostsPage.vue";
import About from "@/pages/About.vue";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostsPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: PostPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
