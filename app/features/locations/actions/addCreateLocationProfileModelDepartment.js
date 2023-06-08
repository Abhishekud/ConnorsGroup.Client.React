export const ADD_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT = 'ADD_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT';

export function addCreateLocationProfileModelDepartment(id, name) {
  return {
    type: ADD_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT,
    payload: {id, name},
  };
}
