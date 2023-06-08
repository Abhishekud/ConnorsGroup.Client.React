export const EDIT_LOCATION_PROFILE = 'EDIT_LOCATION_PROFILE';

export function editLocationProfile(locationProfileId) {
  return {
    type: EDIT_LOCATION_PROFILE,
    payload: locationProfileId,
  };
}
