import {http} from '../../shared/services';

export const UPDATE_ELEMENT_UNIT_OF_MEASURE = 'UPDATE_ELEMENT_UNIT_OF_MEASURE';
export const UPDATE_ELEMENT_UNIT_OF_MEASURE_PENDING = `${UPDATE_ELEMENT_UNIT_OF_MEASURE}_PENDING`;
export const UPDATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED = `${UPDATE_ELEMENT_UNIT_OF_MEASURE}_FULFILLED`;
export const UPDATE_ELEMENT_UNIT_OF_MEASURE_REJECTED = `${UPDATE_ELEMENT_UNIT_OF_MEASURE}_REJECTED`;

export function updateUnitOfMeasure(unitOfMeasure) {
  return {
    type: UPDATE_ELEMENT_UNIT_OF_MEASURE,
    payload: http.put(`element-units-of-measure/${unitOfMeasure.get('id')}`, unitOfMeasure),
  };
}
