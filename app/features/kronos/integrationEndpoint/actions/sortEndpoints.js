export const SORT_ENDPOINTS = 'SORT_KRONOS_ENDPOINTS';

export function sortEndpoints(sort) {
  return {
    type: SORT_ENDPOINTS,
    payload: sort,
  };
}

