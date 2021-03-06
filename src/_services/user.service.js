import { ajaxResponseHandler } from '../_helpers'
import { authHeader } from '../_helpers'
import { store } from '../_store'

export const userService = {
  login,
  logout,
  register,
  activateAccount,
  reset,
  checkPasswordResetToken,
  checkAccountActivationToken,
  setNewPassword,
  list,
  getUser,
  save,
  remove
};

/**
 * Public functions.
 */

function login(username, password)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch('/cbadmin/auth/login', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      // login successful if there's a jwt token in the response
      if (!response.error) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        store.dispatch('setUser', response.data);
      }
      return response;
    });
    /*
    .then(data => {
      if (data.token) {
        console.log('user is logged in, you can redirect');
      }
    });
    */
}

/**
 * Send a request for a password reset URL (sends emial).
 */
function reset(firstname, lastname, email)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstname, lastname, email })
  };

  return fetch('/cbadmin/auth/reset', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

/**
 * Validate the password reset token if it can be used.
 */
function checkPasswordResetToken(token)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  };

  return fetch('/cbadmin/auth/checkPasswordResetToken', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

/**
 * Validate the account activation token if it can be used.
 */
 function checkAccountActivationToken(token)
 {
   const requestOptions = {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ token })
   };
 
   return fetch('/cbadmin/auth/checkAccountActivationToken', requestOptions)
     .then(ajaxResponseHandler.handleResponse)
     .then(response => {
       return response;
     });
 }
 
/**
 * Make ajax call to set the new password.
 */
function setNewPassword(token, newPassword, repeatPassword)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword, repeatPassword })
  };

  return fetch('/cbadmin/auth/saveNewPassword', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

function logout() {
    // remove user from local storage to log user out
    store.dispatch('removeUser');
    //fetch('/cbadmin/auth/logout');
}

function getUser(userId = null)
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  if (userId == null) {
    userId = store.state.user.userId;
  }
  return fetch('/cbadmin/api/user/' + userId+'', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(
      response => {
        return response;
      },
      error => {
        console.log(error);
      }
    );
}

function save(userData)
{
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  };
  return fetch("/cbadmin/api/user/" + (userData.userId || store.state.user.userId ), requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      if (!response.error) {
        if (userData.userId == store.state.user.userId) {
          store.dispatch('saveUserData', response.data);
        }
      }
      return response;
    });
}

function register(userData)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  };
  return fetch('/cbadmin/auth/register', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

/**
 * Try to activate user's account with passed token.
 */
function activateAccount(token)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  };

  return fetch('/cbadmin/auth/activateAccount', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

function list(params = false)
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch('/cbadmin/api/user/?qs=' + encodeURIComponent(params), requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(
      response => {
        return response;
      },
      error => {
        console.log(error);
      }
    );
}

function remove(userId)
{
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch("/cbadmin/api/user/" + userId, requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}