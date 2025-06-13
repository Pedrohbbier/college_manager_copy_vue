import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import PublicCourseDetail from '@/pages/PublicCourseDetail.vue'
import Login from '@/pages/admin/Login.vue'
import Register from '@/pages/admin/Register.vue'
import Dashboard from '../pages/admin/Dashboard.vue'
import CourseForm from '../pages/admin/Courses/Form.vue'
import CoursesList from '../pages/admin/Courses/List.vue'
import PublicCourses from '@/pages/PublicCourses.vue'
import { useAuthStore } from '@/stores/auth'
import MenuLayout from '@/layouts/MenuLayout.vue'


const routes: RouteRecordRaw[] = [
    {
    path: '/',
    component: MenuLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: PublicCourses,
      },
      {
        path: 'courses/:id',
        name: 'PublicCourseDetail',
        component: PublicCourseDetail,
        props: true,
      },
    ],
  },



  {
    path: '/admin/login',
    component: AuthLayout,
    meta: { requiresAuth: false },
    children: [
      { path: '', name: 'Login', component: Login }
    ]
  },
  {
    path: '/admin/register',
    component: AuthLayout,
    meta: { requiresAuth: false },
    children: [
      { path: '', name: 'Register', component: Register }
    ]
  },

  // === Painel Admin ===
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'courses',
        name: 'CoursesList',
        component: CoursesList,
      },
      {
        path: 'courses/create',
        name: 'CourseCreate',
        component: CourseForm,
      },
      {
        path: 'courses/:id/edit',
        name: 'CourseEdit',
        component: CourseForm,
        props: true,
      },
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/admin/login' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const auth = useAuthStore()
  const publicPages = ['/admin/login', '/admin/register']
  const authRequired = to.path.startsWith('/admin') && !publicPages.includes(to.path)

  if (authRequired && !auth.isAuthenticated) {
    return { path: '/admin/login' }
  }

  if (publicPages.includes(to.path) && auth.isAuthenticated) {
    return { path: '/admin/dashboard' }
  }

})

export default router
