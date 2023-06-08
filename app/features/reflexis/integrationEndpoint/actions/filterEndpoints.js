export const FILTER_ENDPOINTS = 'REFLEXIS/INTEGRATION_ENDPOINTS/FILTER_ENDPOINT';

export function filterEndpoints(filter) {
  return {
    type: FILTER_ENDPOINTS,
    payload: filter,
  };
}
