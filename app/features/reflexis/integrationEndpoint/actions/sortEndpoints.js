export const SORT_ENDPOINTS = 'REFLEXIS/INTEGRATION_ENDPOINTS/SORT_ENDPOINT';

export function sortEndpoints(sort) {
  return {
    type: SORT_ENDPOINTS,
    payload: sort,
  };
}

