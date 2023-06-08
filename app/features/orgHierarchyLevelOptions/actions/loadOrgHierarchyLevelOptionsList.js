import {http} from '../../shared/services';

export const LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST = 'LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST';
export const LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_PENDING = `${LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST}_PENDING`;
export const LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_FULFILLED = `${LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST}_FULFILLED`;
export const LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_REJECTED = `${LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST}_REJECTED`;

export function loadOrgHierarchyLevelOptionsList(orgHierarchyLevelId) {
  return {
    type: LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST,
    payload: http.get(`org-hierarchy-levels/${orgHierarchyLevelId}/options/list`),
  };
}
