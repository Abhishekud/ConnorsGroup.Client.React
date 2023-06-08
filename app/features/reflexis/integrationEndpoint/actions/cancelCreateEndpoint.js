export const CANCEL_CREATE_ENDPOINT = 'REFLEXIS/INTEGRATION_ENDPOINT/CANCEL_CREATE_ENDPOINT';

export function cancelCreateEndpoint() {
  return {
    type: CANCEL_CREATE_ENDPOINT,
  };
}
