import {http} from '../../shared/services';

export const LOAD_UNIT_OF_MEASURE_STANDARDS_LIST = 'LOAD_UNIT_OF_MEASURE_STANDARDS_LIST';
export const LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_PENDING = `${LOAD_UNIT_OF_MEASURE_STANDARDS_LIST}_PENDING`;
export const LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_FULFILLED = `${LOAD_UNIT_OF_MEASURE_STANDARDS_LIST}_FULFILLED`;
export const LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_REJECTED = `${LOAD_UNIT_OF_MEASURE_STANDARDS_LIST}_REJECTED`;

export function loadUnitOfMeasureStandardsList(unitOfMeasureId) {
  return {
    type: LOAD_UNIT_OF_MEASURE_STANDARDS_LIST,
    payload: http.get(`units-of-measure/${ unitOfMeasureId }/where-used`),
  };
}
