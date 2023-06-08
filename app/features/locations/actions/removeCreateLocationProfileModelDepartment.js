export const REMOVE_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT = 'REMOVE_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT';

export function removeCreateLocationProfileModelDepartment(id) {
  return {
    type: REMOVE_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT,
    payload: id,
  };
}
