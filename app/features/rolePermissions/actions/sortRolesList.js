import {fromJS} from 'immutable';

export const SORT_ROLES_LIST = 'SORT_ROLES_LIST';

export function sortRolesList(sort) {
  return {
    type: SORT_ROLES_LIST,
    payload: fromJS(sort),
  };
}
