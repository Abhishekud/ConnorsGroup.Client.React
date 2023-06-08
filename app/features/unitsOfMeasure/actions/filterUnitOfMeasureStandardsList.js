import {fromJS} from 'immutable';

export const FILTER_UNIT_OF_MEASURE_STANDARDS_LIST = 'FILTER_UNIT_OF_MEASURE_STANDARDS_LIST';

export function filterUnitOfMeasureStandardsList(filter) {
  return {
    type: FILTER_UNIT_OF_MEASURE_STANDARDS_LIST,
    payload: fromJS(filter),
  };
}
