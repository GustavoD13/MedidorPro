import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import CreateItem from './components/CreateItem.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';
import Reporte from './components/Reporte.vue';
import Medicion from './components/Medicion.vue';
import EditMedidor from './components/EditMedidor.vue';
import DisplayMedidor from './components/DisplayMedidor.vue';

const routes = [
  {
    name: 'DisplayItem',
    path: '/',
    component: DisplayItem
  },
  {
    name: 'CreateItem',
    path: '/create/item',
    component: CreateItem
  },
  {
    name: 'EditItem',
    path: '/edit/:id',
    component: EditItem
  }
  ,
  {
    name: 'Reporte',
    path: '/reporte',
    component: Reporte
  },
  {
    name: 'Medicion',
    path: '/medicion',
    component: Medicion
  },
  {
    name: 'EditMedidor',
    path: '/EditMedidor',
    component: EditMedidor
  }
  ,
  {
    name: 'DisplayMedidor',
    path: '/DisplayMedidor',
    component: DisplayMedidor
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
