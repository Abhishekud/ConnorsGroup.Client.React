import {fromJS} from 'immutable';
export const FILTER_ORG_HIERARCHY_LEVEL_OPTIONS_LIST = 'FILTER_ORG_HIERARCHY_LEVEL_OPTIONS_LIST';

export function filterOrgHierarchyLevelOptionsList(filter) {
  return {
    type: FILTER_ORG_HIERARCHY_LEVEL_OPTIONS_LIST,
    payload: fromJS(filter),
  };
}
