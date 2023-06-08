export const SET_RETURN_PATH = 'SET_RETURN_PATH';

export function setReturnPath(returnPath) {
  return {
    type: SET_RETURN_PATH,
    payload: returnPath,
  };
}
