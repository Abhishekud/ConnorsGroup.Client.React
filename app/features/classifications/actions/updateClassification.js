import {http} from '../../shared/services';

export const UPDATE_CLASSIFICATION = 'UPDATE_CLASSIFICATION';
export const UPDATE_CLASSIFICATION_PENDING = `${UPDATE_CLASSIFICATION}_PENDING`;
export const UPDATE_CLASSIFICATION_FULFILLED = `${UPDATE_CLASSIFICATION}_FULFILLED`;
export const UPDATE_CLASSIFICATION_REJECTED = `${UPDATE_CLASSIFICATION}_REJECTED`;

export function updateClassification(classification) {
  return {
    type: UPDATE_CLASSIFICATION,
    payload: http.put(`classifications/${classification.get('id')}`, classification),
  };
}
