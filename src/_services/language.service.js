import { ajaxResponseHandler } from '../_helpers'
import { authHeader } from '../_helpers'
import { store } from '../_store'

export const languageService = {
    list,
};

/**
 * Public functions.
 */

function list(params = '')
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  const urlParams = (params !== '') ?'?qs='+ encodeURIComponent(params) : '';

  return fetch('/cbadmin/api/language/' + urlParams, requestOptions)
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