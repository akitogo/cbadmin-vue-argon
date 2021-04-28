/*!

=========================================================
* Vue Argon Dashboard - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import { router } from './router.standalone'
import { store } from './_store'
import ArgonDashboard from './plugins/argon-dashboard'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(PrimeVue)
Vue.use(ToastService)

// todo: this should be part of index.js
// for loading locales from file see
// see https://github.com/kazupon/vue-i18n/issues/474
import en from '../locales/en.json'
import de from '../locales/de.json'

export const defaultLocale = 'en'

export const languages = {
  en: en,
  de: de,
}
const messages = Object.assign(languages)

var i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: 'de',
  messages
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')