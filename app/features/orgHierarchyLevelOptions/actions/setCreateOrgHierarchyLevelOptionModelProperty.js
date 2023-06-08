export const SET_CREATE_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY = 'SET_CREATE_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY';

export function setCreateOrgHierarchyLevelOptionModelProperty(name, value) {
  return {
    type: SET_CREATE_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY,
    payload: {name, value},
  };
}
