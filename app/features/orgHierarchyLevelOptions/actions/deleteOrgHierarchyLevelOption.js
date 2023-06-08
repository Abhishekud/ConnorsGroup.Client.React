import {http} from '../../shared/services';

export const DELETE_ORG_HIERARCHY_LEVEL_OPTION = 'DELETE_ORG_HIERARCHY_LEVEL_OPTION';
export const DELETE_ORG_HIERARCHY_LEVEL_OPTION_PENDING = `${DELETE_ORG_HIERARCHY_LEVEL_OPTION}_PENDING`;
export const DELETE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED = `${DELETE_ORG_HIERARCHY_LEVEL_OPTION}_FULFILLED`;
export const DELETE_ORG_HIERARCHY_LEVEL_OPTION_REJECTED = `${DELETE_ORG_HIERARCHY_LEVEL_OPTION}_REJECTED`;

export function deleteOrgHierarchyLevelOption(orgHierarchyLevelId, optionId) {
  return {
    type: DELETE_ORG_HIERARCHY_LEVEL_OPTION,
    payload: http.delete(`org-hierarchy-levels/${orgHierarchyLevelId}/options/${optionId}`),
  };
}
