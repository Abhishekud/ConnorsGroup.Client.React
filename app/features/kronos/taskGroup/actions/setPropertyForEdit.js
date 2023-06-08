export const SET_PROPERTY_FOR_EDIT = 'SET_KRONOS_TASK_GROUP_PROPERTY_FOR_EDIT';

export function setPropertyForEdit(id, value) {
  return {
    type: SET_PROPERTY_FOR_EDIT,
    payload: {id, value},
  };
}

