import {fromJS} from 'immutable';

export const FILTER_PARTS_LIST = 'FILTER_PARTS_LIST';

export function filterPartsList(filter) {
  return {
    type: FILTER_PARTS_LIST,
    payload: fromJS(filter),
  };
}
