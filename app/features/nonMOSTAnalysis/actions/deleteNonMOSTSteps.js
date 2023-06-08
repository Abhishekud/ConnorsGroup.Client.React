import {http} from '../../shared/services';

export const DELETE_NON_MOST_STEPS = 'DELETE_NON_MOST_STEPS';
export const DELETE_NON_MOST_STEPS_PENDING = `${DELETE_NON_MOST_STEPS}_PENDING`;
export const DELETE_NON_MOST_STEPS_FULFILLED = `${DELETE_NON_MOST_STEPS}_FULFILLED`;
export const DELETE_NON_MOST_STEPS_REJECTED = `${DELETE_NON_MOST_STEPS}_REJECTED`;

export function deleteNonMOSTSteps(nonMOSTStepIds) {
  const model = {nonMOSTStepIds};
  return {
    type: DELETE_NON_MOST_STEPS,
    payload: http.post('non-most-steps/delete', model),
  };
}
