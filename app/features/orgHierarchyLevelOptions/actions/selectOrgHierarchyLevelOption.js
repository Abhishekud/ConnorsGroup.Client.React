export const SELECT_ORG_HIERARCHY_LEVEL_OPTION = 'SELECT_ORG_HIERARCHY_LEVEL_OPTION';

export function selectOrgHierarchyLevelOption(orgHierarchyLevelId, orgHierarchyLevelOption) {
  return {
    type: SELECT_ORG_HIERARCHY_LEVEL_OPTION,
    payload: {orgHierarchyLevelId, orgHierarchyLevelOption},
  };
}
