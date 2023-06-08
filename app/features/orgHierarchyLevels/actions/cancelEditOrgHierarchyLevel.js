export const CANCEL_EDIT_ORG_HIERARCHY_LEVEL = 'CANCEL_EDIT_ORG_HIERARCHY_LEVEL';

export function cancelEditOrgHierarchyLevel(orgHierarchyLevelId) {
  return {
    type: CANCEL_EDIT_ORG_HIERARCHY_LEVEL,
    payload: orgHierarchyLevelId,
  };
}
