import {http} from '../../shared/services';

export const CREATE_UNIT_OF_MEASURE = 'CREATE_UNIT_OF_MEASURE';
export const CREATE_UNIT_OF_MEASURE_PENDING = `${CREATE_UNIT_OF_MEASURE}_PENDING`;
export const CREATE_UNIT_OF_MEASURE_FULFILLED = `${CREATE_UNIT_OF_MEASURE}_FULFILLED`;
export const CREATE_UNIT_OF_MEASURE_REJECTED = `${CREATE_UNIT_OF_MEASURE}_REJECTED`;

export function createUnitOfMeasure(model) {
  return {
    type: CREATE_UNIT_OF_MEASURE,
    payload: http.post('units-of-measure', model),
  };
}
