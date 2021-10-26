import { ajaxResponseHandler } from '../_helpers'
import { authHeader } from '../_helpers'

export const menuService =
{
  getMenu,
};

/*******************
 * Public functions.
 *******************/

function getMenu()
{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  };

  return fetch('/cbadmin/api/menu/sidebar', requestOptions)
    .then(ajaxResponseHandler.handleResponse)
    .then(response => {
      return response;
    });
}