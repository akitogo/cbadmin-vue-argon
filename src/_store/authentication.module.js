import { userService } from '../_services';

export const authentication = {
    namespaced: true,
    state: {
        status: { loggedIn: false }
    },
    actions: {
        login({ /* dispatch, */ commit }, { username, password }) {
            commit('loginRequest', { username });

            userService.login(username, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                    },
                    error => {
                        commit('loginFailure', error);
                        /* dispatch('alert/error', error, { root: true }); */
                    }
                );
        },
        logout({ commit }) {
            commit('logout');
        },
        register({ commit }, { firstname, lastname, email ,password }) {
            userService.register(firstname, lastname, email ,password);
            commit('logout');
        },        
        reset({ commit } , { firstname, lastname, email }) {
            userService.reset(firstname, lastname, email);
            commit('resetPassword');
        }        
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state, error) {
            state.status = { loginError: error };
            state.user = null;
        },
        resetPassword(state) {
            state.status = {};
            state.user = null;
        },        
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}