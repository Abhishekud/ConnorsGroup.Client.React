import {http} from '../../shared/services';

export const UPDATE_ORG_HIERARCHY_LEVEL = 'UPDATE_ORG_HIERARCHY_LEVEL';
export const UPDATE_ORG_HIERARCHY_LEVEL_PENDING = `${UPDATE_ORG_HIERARCHY_LEVEL}_PENDING`;
export const UPDATE_ORG_HIERARCHY_LEVEL_FULFILLED = `${UPDATE_ORG_HIERARCHY_LEVEL}_FULFILLED`;
export const UPDATE_ORG_HIERARCHY_LEVEL_REJECTED = `${UPDATE_ORG_HIERARCHY_LEVEL}_REJECTED`;

export function updateOrgHierarchyLevel(orgHierarchyLevelId, orgHierarchyLevel) {
  return {
    type: UPDATE_ORG_HIERARCHY_LEVEL,
    payload: {
      promise: http.put(`org-hierarchy-levels/${orgHierarchyLevelId}`, {name: orgHierarchyLevel.get('name')}),
    },
  };
}
