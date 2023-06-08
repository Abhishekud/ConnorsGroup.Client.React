import {fromJS} from 'immutable';

export const SORT_ELEMENT_UNITS_OF_MEASURE_LIST = 'SORT_ELEMENT_UNITS_OF_MEASURE_LIST';

export function sortUnitsOfMeasureList(sort) {
  return {
    type: SORT_ELEMENT_UNITS_OF_MEASURE_LIST,
    payload: fromJS(sort),
  };
}
