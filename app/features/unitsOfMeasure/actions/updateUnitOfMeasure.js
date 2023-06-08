import {http} from '../../shared/services';

export const UPDATE_UNIT_OF_MEASURE = 'UPDATE_UNIT_OF_MEASURE';
export const UPDATE_UNIT_OF_MEASURE_PENDING = `${UPDATE_UNIT_OF_MEASURE}_PENDING`;
export const UPDATE_UNIT_OF_MEASURE_FULFILLED = `${UPDATE_UNIT_OF_MEASURE}_FULFILLED`;
export const UPDATE_UNIT_OF_MEASURE_REJECTED = `${UPDATE_UNIT_OF_MEASURE}_REJECTED`;

export function updateUnitOfMeasure(unitOfMeasure) {
  return {
    type: UPDATE_UNIT_OF_MEASURE,
    payload: http.put(`units-of-measure/${unitOfMeasure.get('id')}`, unitOfMeasure),
  };
}
