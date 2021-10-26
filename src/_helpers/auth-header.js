import { store } from '../_store'

export function authHeader() {
    // return authorization header with jwt token
    let user = store.state.user;

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}