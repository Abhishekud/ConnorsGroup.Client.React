export const SET_EDIT_MASS_UPDATE_ELEMENT_WORKING_MODEL_PROPERTY = 'SET_EDIT_MASS_UPDATE_ELEMENT_WORKING_MODEL_PROPERTY';

export function setEditMassUpdateElementWorkingModelProperty(name, value) {
  return {
    type: SET_EDIT_MASS_UPDATE_ELEMENT_WORKING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
