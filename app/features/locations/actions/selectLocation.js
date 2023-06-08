export const SELECT_LOCATION = 'SELECT_LOCATION';

export function selectLocation(location) {
  return {
    type: SELECT_LOCATION,
    payload: location,
  };
}
