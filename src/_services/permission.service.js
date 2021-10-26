import { ajaxResponseHandler } from '../_helpers'
import { authHeader } from '../_helpers'

export const permissionService = {
    list,
    get,
    save,
    removePermission
};

/**
 * Public functions.
 */

function get(permissionId = null)
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch('/cbadmin/api/permission/' + permissionId +'', requestOptions)
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

function save(data)
{
  var isNew = data.permissionId ? false : true;
  const requestOptions = {
    method: isNew ? "POST" : "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };
  return fetch("/cbadmin/api/permission/" + (isNew ? '' : data.permissionId), requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}

function removePermission(permissionId)
{
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch("/cbadmin/api/permission/" + permissionId, requestOptions)
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

  var queryString = '';
  if (params) {
    queryString = '?qs=' + encodeURIComponent(params);
  }
  return fetch('/cbadmin/api/permission/' + queryString, requestOptions)
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