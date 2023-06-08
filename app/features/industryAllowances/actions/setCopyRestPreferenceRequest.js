export const SET_COPY_REST_PREFERENCE_REQUEST = 'SET_COPY_REST_PREFERENCE_REQUEST';

export function setCopyRestPreferenceRequest(name, value) {
  return {
    type: SET_COPY_REST_PREFERENCE_REQUEST,
    payload: {name, value},
  };
}
