import {http} from '../../shared/services';

export const DELETE_ORG_HIERARCHY_LEVEL = 'DELETE_ORG_HIERARCHY_LEVEL';
export const DELETE_ORG_HIERARCHY_LEVEL_PENDING = `${DELETE_ORG_HIERARCHY_LEVEL}_PENDING`;
export const DELETE_ORG_HIERARCHY_LEVEL_FULFILLED = `${DELETE_ORG_HIERARCHY_LEVEL}_FULFILLED`;
export const DELETE_ORG_HIERARCHY_LEVEL_REJECTED = `${DELETE_ORG_HIERARCHY_LEVEL}_REJECTED`;

export function deleteOrgHierarchyLevel(orgHierarchyLevelId) {
  return {
    type: DELETE_ORG_HIERARCHY_LEVEL,
    payload: {
      promise: http.delete(`org-hierarchy-levels/${orgHierarchyLevelId}`),
    },
  };
}
