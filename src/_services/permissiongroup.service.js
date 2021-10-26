import { ajaxResponseHandler } from '../_helpers'
import { authHeader } from '../_helpers'

export const permissiongroupService = {
    list,
    get,
    save,
    remove
};

/**
 * Public functions.
 */

function get(permissionGroupId = null)
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch('/cbadmin/api/permissiongroup/' + permissionGroupId+'', requestOptions)
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

function save(permissiongroupData)
{
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(permissiongroupData)
  };
  return fetch("/cbadmin/api/permissiongroup/" + (permissiongroupData.permissionGroupId ), requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

function remove(permissionGroupId)
{
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch("/cbadmin/api/permissiongroup/" + permissionGroupId, requestOptions)
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

  return fetch('/cbadmin/api/permissiongroup/?qs=' + encodeURIComponent(params), requestOptions)
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