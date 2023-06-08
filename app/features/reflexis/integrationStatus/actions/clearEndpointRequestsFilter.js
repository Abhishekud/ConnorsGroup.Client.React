export const CLEAR_ENDPOINT_REQUESTS_FILTER = 'REFLEXIS/INTEGRATION_ENDPOINTS/CLEAR_REQUESTS_FILTER';

export function clearEndpointRequestsFilter() {
  return {
    type: CLEAR_ENDPOINT_REQUESTS_FILTER,
  };
}
