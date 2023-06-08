export const REMOVE_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT = 'REMOVE_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT';

export function removeEditLocationProfileModelDepartment(locationProfileId, id) {
  return {
    type: REMOVE_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT,
    payload: {locationProfileId, id},
  };
}
