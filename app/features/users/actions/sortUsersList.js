import {fromJS} from 'immutable';

export const SORT_USERS_LIST = 'SORT_USERS_LIST';

export function sortUsersList(sort) {
  return {
    type: SORT_USERS_LIST,
    payload: fromJS(sort),
  };
}
