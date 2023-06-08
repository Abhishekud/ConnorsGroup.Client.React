export const SET_EDIT_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY = 'SET_EDIT_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY';

export function setEditOrgHierarchyLevelOptionModelProperty(name, value) {
  return {
    type: SET_EDIT_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
