import {http} from '../../shared/services';

export const LOAD_UNIT_OF_MEASURE_SELECT_LIST_OPTIONS = 'LOAD_UNIT_OF_MEASURE_SELECT_LIST_OPTIONS';
export const LOAD_UNIT_OF_MEASURE_SELECT_LIST_OPTIONS_FULFILLED = `${LOAD_UNIT_OF_MEASURE_SELECT_LIST_OPTIONS}_FULFILLED`;

export function loadUnitOfMeasureSelectListOptions() {
  return {
    type: LOAD_UNIT_OF_MEASURE_SELECT_LIST_OPTIONS,
    payload: http.get('units-of-measure/select-list-options'),
  };
}
