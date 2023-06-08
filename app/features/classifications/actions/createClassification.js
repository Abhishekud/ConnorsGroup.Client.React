import {http} from '../../shared/services';

export const CREATE_CLASSIFICATION = 'CREATE_CLASSIFICATION';
export const CREATE_CLASSIFICATION_PENDING = `${CREATE_CLASSIFICATION}_PENDING`;
export const CREATE_CLASSIFICATION_FULFILLED = `${CREATE_CLASSIFICATION}_FULFILLED`;
export const CREATE_CLASSIFICATION_REJECTED = `${CREATE_CLASSIFICATION}_REJECTED`;

export function createClassification(model) {
  return {
    type: CREATE_CLASSIFICATION,
    payload: http.post('classifications', model),
  };
}
