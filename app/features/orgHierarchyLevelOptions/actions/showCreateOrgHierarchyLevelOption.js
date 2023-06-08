export const SHOW_CREATE_ORG_HIERARCHY_LEVEL_OPTION = 'SHOW_CREATE_ORG_HIERARCHY_LEVEL_OPTION';

export function showCreateOrgHierarchyLevelOption(orgHierarchyLevelId) {
  return {
    type: SHOW_CREATE_ORG_HIERARCHY_LEVEL_OPTION,
    payload: orgHierarchyLevelId,
  };
}
