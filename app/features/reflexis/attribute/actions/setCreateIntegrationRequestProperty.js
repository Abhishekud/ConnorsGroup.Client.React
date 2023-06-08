export const SET_CREATE_INTEGRATION_REQUEST_PROPERTY = 'REFLEXIS/SET_CREATE_INTEGRATION_REQUEST_PROPERTY';

export function setCreateIntegrationRequestProperty(name, value) {
  return {
    type: SET_CREATE_INTEGRATION_REQUEST_PROPERTY,
    payload: {name, value},
  };
}
