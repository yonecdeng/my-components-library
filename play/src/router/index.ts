import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/todos/home'
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
