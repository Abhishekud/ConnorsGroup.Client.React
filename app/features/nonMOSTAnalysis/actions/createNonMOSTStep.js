import {http} from '../../shared/services';

export const CREATE_NON_MOST_STEP = 'CREATE_NON_MOST_STEP';
export const CREATE_NON_MOST_STEP_PENDING = `${CREATE_NON_MOST_STEP}_PENDING`;
export const CREATE_NON_MOST_STEP_FULFILLED = `${CREATE_NON_MOST_STEP}_FULFILLED`;
export const CREATE_NON_MOST_STEP_REJECTED = `${CREATE_NON_MOST_STEP}_REJECTED`;

export function createNonMOSTStep(parentType, parentId, insertAtNumber) {
  return {
    type: CREATE_NON_MOST_STEP,
    payload: http.post('non-most-steps/create', {
      parentType,
      parentId,
      insertAtNumber,
    }),
  };
}
