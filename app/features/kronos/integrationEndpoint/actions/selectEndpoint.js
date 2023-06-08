export const SELECT_ENDPOINT = 'SELECT_KRONOS_ENDPOINT';

export function selectEndpoint(endpoint) {
  return {
    type: SELECT_ENDPOINT,
    payload: endpoint,
  };
}
