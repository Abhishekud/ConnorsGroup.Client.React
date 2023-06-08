import {fromJS} from 'immutable';

export const TOGGLE_STANDARD_ELEMENT_GROUPS_COLLAPSE = 'TOGGLE_STANDARD_ELEMENT_GROUPS_COLLAPSE';

export function toggleStandardElementGroupsCollapse(standardElementGroupIds) {
  return {
    type: TOGGLE_STANDARD_ELEMENT_GROUPS_COLLAPSE,
    payload: fromJS(standardElementGroupIds),
  };
}
