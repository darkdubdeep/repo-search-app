import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Repository from '../views/Repository.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/repository/:name',
    name: 'repository',
    component: Repository
  }
];

const router = new VueRouter({
  routes
});

export default router;
