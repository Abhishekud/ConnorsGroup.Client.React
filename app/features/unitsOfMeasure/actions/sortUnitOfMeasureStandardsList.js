import {fromJS} from 'immutable';

export const SORT_UNIT_OF_MEASURE_STANDARDS_MAPPING_LIST = 'SORT_UNIT_OF_MEASURE_STANDARDS_MAPPING_LIST';

export function sortUnitOfMeasureStandardsList(sort) {
  return {
    type: SORT_UNIT_OF_MEASURE_STANDARDS_MAPPING_LIST,
    payload: fromJS(sort),
  };
}
