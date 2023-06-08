import {http} from '../../shared/services';

export const MOVE_ORG_HIERARCHY_LEVEL = 'MOVE_ORG_HIERARCHY_LEVEL';
export const MOVE_ORG_HIERARCHY_LEVEL_PENDING = `${MOVE_ORG_HIERARCHY_LEVEL}_PENDING`;
export const MOVE_ORG_HIERARCHY_LEVEL_FULFILLED = `${MOVE_ORG_HIERARCHY_LEVEL}_FULFILLED`;
export const MOVE_ORG_HIERARCHY_LEVEL_REJECTED = `${MOVE_ORG_HIERARCHY_LEVEL}_REJECTED`;

export function moveOrgHierarchyLevel(orgHierarchyLevelId, action) {
  return {
    type: MOVE_ORG_HIERARCHY_LEVEL,
    payload: http.put(`org-hierarchy-levels/${orgHierarchyLevelId}/move`, {action}),
  };
}
