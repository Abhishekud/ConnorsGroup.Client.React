export const ADD_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT = 'ADD_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT';

export function addEditLocationProfileModelDepartment(locationProfileId, id, name) {
  return {
    type: ADD_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT,
    payload: {locationProfileId, id, name},
  };
}
