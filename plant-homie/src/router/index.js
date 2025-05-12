import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import PlantListView from '../views/PlantListView.vue';
import NotificationsView from '../views/NotificationsView.vue';
import HistoryView from '../views/HistoryView.vue';
import AddRemoveView from '../views/AddRemoveView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    redirect: () => {
      return sessionStorage.getItem('token') ? '/dashboard' : '/login';
    }
  },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/plant-list', name: 'PlantList', component: PlantListView, meta: { requiresAuth: true } },
  { path: '/notifications', name: 'Notifications', component: NotificationsView, meta: { requiresAuth: true } },
  { path: '/history', name: 'History', component: HistoryView, meta: { requiresAuth: true } },
  { path: '/add-remove', name: 'AddRemove', component: AddRemoveView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!sessionStorage.getItem('token');
  if (to.path === '/login' && isLoggedIn) {
    next('/dashboard');
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
