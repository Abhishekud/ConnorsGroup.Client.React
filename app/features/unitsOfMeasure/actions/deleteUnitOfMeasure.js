import {http} from '../../shared/services';

export const DELETE_UNIT_OF_MEASURE = 'DELETE_UNIT_OF_MEASURE';
export const DELETE_UNIT_OF_MEASURE_PENDING = `${DELETE_UNIT_OF_MEASURE}_PENDING`;
export const DELETE_UNIT_OF_MEASURE_FULFILLED = `${DELETE_UNIT_OF_MEASURE}_FULFILLED`;
export const DELETE_UNIT_OF_MEASURE_REJECTED = `${DELETE_UNIT_OF_MEASURE}_REJECTED`;

export function deleteUnitOfMeasure(unitOfMeasureId) {
  return {
    type: DELETE_UNIT_OF_MEASURE,
    payload: http.delete(`units-of-measure/${unitOfMeasureId}`),
  };
}
