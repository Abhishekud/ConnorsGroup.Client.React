import {fromJS} from 'immutable';
export const FILTER_USERS_LIST = 'FILTER_USERS_LIST';

export function filterUsersList(filter) {
  return {
    type: FILTER_USERS_LIST,
    payload: fromJS(filter),
  };
}
