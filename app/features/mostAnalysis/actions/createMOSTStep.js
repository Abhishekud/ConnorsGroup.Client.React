import {http} from '../../shared/services';

export const CREATE_MOST_STEP = 'CREATE_MOST_STEP';
export const CREATE_MOST_STEP_PENDING = `${CREATE_MOST_STEP}_PENDING`;
export const CREATE_MOST_STEP_FULFILLED = `${CREATE_MOST_STEP}_FULFILLED`;
export const CREATE_MOST_STEP_REJECTED = `${CREATE_MOST_STEP}_REJECTED`;

export function createMOSTStep(parentType, parentId, insertAtNumber) {
  return {
    type: CREATE_MOST_STEP,
    payload: http.post('most-steps/create', {
      parentType,
      parentId,
      insertAtNumber,
    }),
  };
}
