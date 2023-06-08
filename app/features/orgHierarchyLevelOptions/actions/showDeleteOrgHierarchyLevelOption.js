export const SHOW_DELETE_ORG_HIERARCHY_LEVEL_OPTION = 'SHOW_DELETE_ORG_HIERARCHY_LEVEL_OPTION';

export function showDeleteOrgHierarchyLevelOption(orgHierarchyLevelId, orgHierarchyLevelOption) {
  return {
    type: SHOW_DELETE_ORG_HIERARCHY_LEVEL_OPTION,
    payload: {orgHierarchyLevelId, orgHierarchyLevelOption},
  };
}
