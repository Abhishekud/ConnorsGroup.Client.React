import {http} from '../../shared/services';

export const CREATE_ELEMENT_UNIT_OF_MEASURE = 'CREATE_ELEMENT_UNIT_OF_MEASURE';
export const CREATE_ELEMENT_UNIT_OF_MEASURE_PENDING = `${CREATE_ELEMENT_UNIT_OF_MEASURE}_PENDING`;
export const CREATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED = `${CREATE_ELEMENT_UNIT_OF_MEASURE}_FULFILLED`;
export const CREATE_ELEMENT_UNIT_OF_MEASURE_REJECTED = `${CREATE_ELEMENT_UNIT_OF_MEASURE}_REJECTED`;

export function createUnitOfMeasure(model) {
  return {
    type: CREATE_ELEMENT_UNIT_OF_MEASURE,
    payload: http.post('element-units-of-measure', model),
  };
}
