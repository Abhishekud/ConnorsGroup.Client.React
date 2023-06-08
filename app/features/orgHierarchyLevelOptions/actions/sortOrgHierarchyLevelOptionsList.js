import {fromJS} from 'immutable';

export const SORT_ORG_HIERARCHY_LEVEL_OPTIONS_LIST = 'SORT_ORG_HIERARCHY_LEVEL_OPTIONS_LIST';

export function sortOrgHierarchyLevelOptionsList(sort) {
  return {
    type: SORT_ORG_HIERARCHY_LEVEL_OPTIONS_LIST,
    payload: fromJS(sort),
  };
}
