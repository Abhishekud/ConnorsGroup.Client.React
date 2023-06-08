import {http} from '../../shared/services';

export const DELETE_MOST_STEPS = 'DELETE_MOST_STEPS';
export const DELETE_MOST_STEPS_PENDING = `${DELETE_MOST_STEPS}_PENDING`;
export const DELETE_MOST_STEPS_FULFILLED = `${DELETE_MOST_STEPS}_FULFILLED`;
export const DELETE_MOST_STEPS_REJECTED = `${DELETE_MOST_STEPS}_REJECTED`;

export function deleteMOSTSteps(mostStepIds) {
  const model = {mostStepIds};
  return {
    type: DELETE_MOST_STEPS,
    payload: http.post('most-steps/delete', model),
  };
}
