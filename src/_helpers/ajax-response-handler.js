import { store } from '../_store'

export const ajaxResponseHandler = {
  handleResponse,
};

function handleResponse(response)
{
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      if (response.status === 401) {
        store.dispatch('authentication/logout');
      }
    }

    return data;
  });
}