export const SET_PROPERTY_FOR_CREATE = 'SET_KRONOS_JOB_PROPERTY_FOR_CREATE';

export function setPropertyForCreate(id, value) {
  return {
    type: SET_PROPERTY_FOR_CREATE,
    payload: {id, value},
  };
}

