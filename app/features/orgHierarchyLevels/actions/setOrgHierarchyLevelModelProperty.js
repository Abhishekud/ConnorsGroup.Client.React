export const SET_ORG_HIERARCHY_LEVEL_MODEL_PROPERTY = 'SET_ORG_HIERARCHY_LEVEL_MODEL_PROPERTY';

export function setOrgHierarchyLevelModelProperty(orgHierarchyLevelId, name, value) {
  return {
    type: SET_ORG_HIERARCHY_LEVEL_MODEL_PROPERTY,
    payload: {orgHierarchyLevelId, name, value},
  };
}
