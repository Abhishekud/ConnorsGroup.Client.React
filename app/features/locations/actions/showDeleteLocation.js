export const SHOW_DELETE_LOCATION = 'SHOW_DELETE_LOCATION';

export function showDeleteLocation(location) {
  return {
    type: SHOW_DELETE_LOCATION,
    payload: location,
  };
}
