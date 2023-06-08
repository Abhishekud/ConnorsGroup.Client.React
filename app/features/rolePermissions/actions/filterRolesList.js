import {fromJS} from 'immutable';

export const FILTER_ROLES_LIST = 'FILTER_ROLES_LIST';

export function filterRolesList(filter) {
  return {
    type: FILTER_ROLES_LIST,
    payload: fromJS(filter),
  };
}
