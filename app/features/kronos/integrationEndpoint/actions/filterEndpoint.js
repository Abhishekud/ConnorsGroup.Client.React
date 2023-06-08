export const FILTER_ENDPOINTS = 'FILTER_KRONOS_ENDPOINTS';

export function filterEndpoints(filter) {
  return {
    type: FILTER_ENDPOINTS,
    payload: filter,
  };
}

