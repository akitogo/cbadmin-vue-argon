import { ajaxResponseHandler } from '../_helpers'

export const configService = {
    get,
};

/**
 * Public functions.
 */

function get()
{
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch('/cbadmin/config', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
        return response;
      });
}