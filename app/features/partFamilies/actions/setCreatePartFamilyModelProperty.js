export const SET_CREATE_PART_FAMILY_MODEL_PROPERTY = 'SET_CREATE_PART_FAMILY_MODEL_PROPERTY';

export function setCreatePartFamilyModelProperty(name, value) {
  return {
    type: SET_CREATE_PART_FAMILY_MODEL_PROPERTY,
    payload: {name, value},
  };
}