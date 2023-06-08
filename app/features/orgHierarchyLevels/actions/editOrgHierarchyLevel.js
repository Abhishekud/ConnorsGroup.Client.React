export const EDIT_ORG_HIERARCHY_LEVEL = 'EDIT_ORG_HIERARCHY_LEVEL';

export function editOrgHierarchyLevel(orgHierarchyLevelId) {
  return {
    type: EDIT_ORG_HIERARCHY_LEVEL,
    payload: orgHierarchyLevelId,
  };
}
