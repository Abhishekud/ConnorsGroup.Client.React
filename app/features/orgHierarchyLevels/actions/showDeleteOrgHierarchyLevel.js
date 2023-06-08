export const SHOW_DELETE_ORG_HIERARCHY_LEVEL = 'SHOW_DELETE_ORG_HIERARCHY_LEVEL';

export function showDeleteOrgHierarchyLevel(orgHierarchyLevel) {
  return {
    type: SHOW_DELETE_ORG_HIERARCHY_LEVEL,
    payload: orgHierarchyLevel,
  };
}
