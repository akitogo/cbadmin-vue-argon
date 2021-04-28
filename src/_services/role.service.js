import { ajaxResponseHandler } from '../_helpers'
import { authHeader } from '../_helpers'

export const roleService = {
    list,
    getRole,
    saveRole,
    remove
};

/**
 * Public functions.
 */

function getRole(roleId = null)
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch('/cbadmin/api/role/' + roleId+'', requestOptions)
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

function saveRole(data)
{
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };
  return fetch("/cbadmin/api/role/" + data.roleId, requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

function list(params = '')
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  const urlParams = (params !== '') ?'?qs='+ encodeURIComponent(params) : '';

  return fetch('/cbadmin/api/role/' + urlParams, requestOptions)
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

function remove(roleId)
{
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch("/cbadmin/api/role/" + roleId, requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}