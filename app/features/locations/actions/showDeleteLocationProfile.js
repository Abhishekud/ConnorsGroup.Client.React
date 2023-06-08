export const SHOW_DELETE_LOCATION_PROFILE = 'SHOW_DELETE_LOCATION_PROFILE';

export function showDeleteLocationProfile(locationProfile) {
  return {
    type: SHOW_DELETE_LOCATION_PROFILE,
    payload: locationProfile,
  };
}
