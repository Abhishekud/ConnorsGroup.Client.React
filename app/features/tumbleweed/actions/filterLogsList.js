import {fromJS} from 'immutable';

export const FILTER_TUMBLEWEED_LOGS_LIST = 'FILTER_TUMBLEWEED_LOGS_LIST';

export function filterLogsList(filter) {
  return {
    type: FILTER_TUMBLEWEED_LOGS_LIST,
    payload: fromJS(filter),
  };
}
