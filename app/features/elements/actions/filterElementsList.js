import {fromJS} from 'immutable';
export const FILTER_ELEMENTS_LIST = 'FILTER_ELEMENTS_LIST';

export function filterElementsList(filter) {
  return {
    type: FILTER_ELEMENTS_LIST,
    payload: fromJS(filter),
  };
}
