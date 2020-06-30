import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';
import AuthService from '@/services/AuthService.ts';
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import NotFound from '../views/NotFound.vue';
import Profile from '../views/Profile.vue';
import Messages from '../views/Messages.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Store from '../views/Store.vue';
import Orders from '../views/Orders.vue';
import Friends from '../views/Friends.vue';
import Logout from '../views/Logout.vue';
import Forbidden from '../views/Forbidden.vue';
import Dialog from '../views/Dialog.vue';
import Search from '../views/Search.vue';
import Product from '../views/Product.vue';
import MyStore from '../views/MyStore.vue';

Vue.use(VueRouter);

export const DEFAULT_REDIRECT_PAGE = () => {
  const parsedToken = AuthService.parseCurrentToken();
  return (AuthService.isSignedIn() && parsedToken)  ? { name: 'Profile', params: { id: parsedToken.id } } : { name: 'Login' };
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Root',
    redirect: DEFAULT_REDIRECT_PAGE,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/dialog/:id',
    name: 'Dialog',
    component: Dialog
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/feed',
    name: 'Home',
    component: Home,
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends,
  },
  {
    path: '/store',
    name: 'Store',
    component: Store,
  },
  {
    path: '/my-store',
    name: 'MyStore',
    component: MyStore,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/my-orders',
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/user/:id',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideLeftSideBar: true,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      hideLeftSideBar: true,
    }
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: Forbidden,
  },
  {
    path: '*',
    name: 'All',
    redirect: { name: 'NotFound' },
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

const PUBLIC_ROUTE_NAMES = [
  'Login',
  'Register',
]

router.beforeEach((to: Route, from: Route, next: any) => {
  if (authGuard(to)) next({ name: 'Login' });
  if (isPublicRouteWhenAuthed(to)) next(DEFAULT_REDIRECT_PAGE());
  else next();
});

function authGuard(TO: Route) {
  return PUBLIC_ROUTE_NAMES.every((ROUTE_NAME: string) => TO.name !== ROUTE_NAME) && !AuthService.isSignedIn();
}

function isPublicRouteWhenAuthed(TO: Route) {
  return PUBLIC_ROUTE_NAMES.every((ROUTE_NAME: string) => TO.name === ROUTE_NAME) && AuthService.isSignedIn()
}

export default router;
