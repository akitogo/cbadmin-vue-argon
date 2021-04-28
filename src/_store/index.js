import Vue from 'vue'
import Vuex from 'vuex'

import { authentication } from './authentication.module'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            id: '',
            token: '',
            firstname: '',
            lastname: '',
        },
    },
    actions: {
        setUser({ commit }, userData) {
            commit('setUser', userData);
        },
        saveUserData({ commit }, userData) {
            commit('saveUserData', userData);
        },
        removeUser({ commit }) {
            commit('removeUser');
        },
        setMenu({ commit }, menuStruct) {
            commit('setMenu', menuStruct);
        },
        resetMenu({ commit }) {
            commit('resetMenu');
        }
    },
    mutations: {
        setUser(state, userData) {
            state.user = userData;
        },
        saveUserData(state, userData) {
            state.user.firstName = userData.firstName;
            state.user.lastName = userData.lastName;
        },
        removeUser(state) {
            state.user = {};
        },
        setMenu(state, menuStruct) {
            state.menu = menuStruct;
        },
        resetMenu(state) {
            state.menu = [];
        }
    },
    modules: {
        authentication
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })],
});