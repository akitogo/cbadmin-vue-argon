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
                .then(response => {
                    if (response.error) {
                        commit('loginFailure', response.messages.join('. '));
                        //dispatch('alert/error', error, { root: true });
                    } else {
                        commit('loginSuccess', response.data);
                    }
                });
        },
        logout({ commit }) {
            commit('logout');
        },
        register({ commit }, { firstname, lastname, email ,password }) {
            userService.register(firstname, lastname, email ,password);
            commit('logout');
        },
        reset({ commit } , { firstname, lastname, email }) {
            if (!firstname || !lastname || !email) {
                commit('resetPasswordError', 'All fields are required.');
                return;
            }
            commit('resetPasswordStart');
            userService.reset(firstname, lastname, email)
                .then(response => {
                    console.log(response);
                    if (response.error) {
                        // error
                        commit('resetPasswordError', response.messages.join('. '));
                    } else {
                        // success
                        commit('resetPasswordSuccess', response.messages.join('. '));
                    }
                    //commit('resetPasswordReset');
                });
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
        resetPasswordStart(state) {
            state.status = { resetSent: true };
            state.user = null;
        },
        resetPasswordError(state, error) {
            state.status = { resetError: error};
            state.user = null;
        },
        resetPasswordSuccess(state, successMsg) {
            state.status = { resetSuccess: successMsg};
            state.user = null;
        },
        resetPasswordReset(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}