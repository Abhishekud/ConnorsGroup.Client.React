import {http} from '../../shared/services';

export const LOAD_UNITS_OF_MEASURE_LIST = 'LOAD_UNITS_OF_MEASURE_LIST';
export const LOAD_UNITS_OF_MEASURE_LIST_PENDING = `${LOAD_UNITS_OF_MEASURE_LIST}_PENDING`;
export const LOAD_UNITS_OF_MEASURE_LIST_FULFILLED = `${LOAD_UNITS_OF_MEASURE_LIST}_FULFILLED`;
export const LOAD_UNITS_OF_MEASURE_LIST_REJECTED = `${LOAD_UNITS_OF_MEASURE_LIST}_REJECTED`;

export function loadUnitsOfMeasureList(departmentId) {
  return {
    type: LOAD_UNITS_OF_MEASURE_LIST,
    payload: http.get(`units-of-measure/list/${departmentId}`),
  };
}
