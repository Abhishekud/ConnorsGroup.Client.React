export const CANCEL_EDIT_LOCATION_PROFILE = 'CANCEL_EDIT_LOCATION_PROFILE';

export function cancelEditLocationProfile(locationProfileId) {
  return {
    type: CANCEL_EDIT_LOCATION_PROFILE,
    payload: locationProfileId,
  };
}
