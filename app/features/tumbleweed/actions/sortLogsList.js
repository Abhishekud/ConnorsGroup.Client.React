import {fromJS} from 'immutable';

export const SORT_TUMBLEWEED_LOGS_LIST = 'SORT_TUMBLEWEED_LOGS_LIST';

export function sortLogsList(sort) {
  return {
    type: SORT_TUMBLEWEED_LOGS_LIST,
    payload: fromJS(sort),
  };
}
