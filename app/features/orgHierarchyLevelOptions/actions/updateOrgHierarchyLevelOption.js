import {http} from '../../shared/services';

export const UPDATE_ORG_HIERARCHY_LEVEL_OPTION = 'UPDATE_ORG_HIERARCHY_LEVEL_OPTION';
export const UPDATE_ORG_HIERARCHY_LEVEL_OPTION_PENDING = `${UPDATE_ORG_HIERARCHY_LEVEL_OPTION}_PENDING`;
export const UPDATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED = `${UPDATE_ORG_HIERARCHY_LEVEL_OPTION}_FULFILLED`;
export const UPDATE_ORG_HIERARCHY_LEVEL_OPTION_REJECTED = `${UPDATE_ORG_HIERARCHY_LEVEL_OPTION}_REJECTED`;

export function updateOrgHierarchyLevelOption(orgHierarchyLevelId, model) {
  return {
    type: UPDATE_ORG_HIERARCHY_LEVEL_OPTION,
    payload: http.put(`org-hierarchy-levels/${orgHierarchyLevelId}/options/${model.get('id')}`, model),
  };
}
