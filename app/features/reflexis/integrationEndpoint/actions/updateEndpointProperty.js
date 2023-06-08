export const UPDATE_ENDPOINT_PROPERTY = 'REFLEXIS/INTEGRATION_ENDPOINT/UPDATE_ENDPOINT_PROPERTY';

export function updateEndpointProperty(id, value) {
  return {
    type: UPDATE_ENDPOINT_PROPERTY,
    payload: {id, value},
  };
}
