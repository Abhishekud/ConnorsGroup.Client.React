import {http} from '../../shared/services';

export const LOAD_ORG_HIERARCHY_LEVELS_LIST = 'LOAD_ORG_HIERARCHY_LEVELS_LIST';
export const LOAD_ORG_HIERARCHY_LEVELS_LIST_PENDING = `${LOAD_ORG_HIERARCHY_LEVELS_LIST}_PENDING`;
export const LOAD_ORG_HIERARCHY_LEVELS_LIST_FULFILLED = `${LOAD_ORG_HIERARCHY_LEVELS_LIST}_FULFILLED`;
export const LOAD_ORG_HIERARCHY_LEVELS_LIST_REJECTED = `${LOAD_ORG_HIERARCHY_LEVELS_LIST}_REJECTED`;

export function loadOrgHierarchyLevelsList() {
  return {
    type: LOAD_ORG_HIERARCHY_LEVELS_LIST,
    payload: http.get('org-hierarchy-levels/list'),
  };
}
