import {http} from '../../shared/services';

export const DELETE_CLASSIFICATION = 'DELETE_CLASSIFICATION';
export const DELETE_CLASSIFICATION_PENDING = `${DELETE_CLASSIFICATION}_PENDING`;
export const DELETE_CLASSIFICATION_FULFILLED = `${DELETE_CLASSIFICATION}_FULFILLED`;
export const DELETE_CLASSIFICATION_REJECTED = `${DELETE_CLASSIFICATION}_REJECTED`;

export function deleteClassification(classificationId) {
  return {
    type: DELETE_CLASSIFICATION,
    payload: http.delete(`classifications/${classificationId}`),
  };
}
