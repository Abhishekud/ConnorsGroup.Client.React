import {http} from '../../shared/services';

export const CREATE_ORG_HIERARCHY_LEVEL_OPTION = 'CREATE_ORG_HIERARCHY_LEVEL_OPTION';
export const CREATE_ORG_HIERARCHY_LEVEL_OPTION_PENDING = `${CREATE_ORG_HIERARCHY_LEVEL_OPTION}_PENDING`;
export const CREATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED = `${CREATE_ORG_HIERARCHY_LEVEL_OPTION}_FULFILLED`;
export const CREATE_ORG_HIERARCHY_LEVEL_OPTION_REJECTED = `${CREATE_ORG_HIERARCHY_LEVEL_OPTION}_REJECTED`;

export function createOrgHierarchyLevelOption(orgHierarchyLevelId, model) {
  return {
    type: CREATE_ORG_HIERARCHY_LEVEL_OPTION,
    payload: http.post(`org-hierarchy-levels/${orgHierarchyLevelId}/options`, model),
  };
}
