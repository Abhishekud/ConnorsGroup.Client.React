import {http} from '../../shared/services';

export const UPDATE_MOST_STEP = 'UPDATE_MOST_STEP';
export const UPDATE_MOST_STEP_PENDING = `${UPDATE_MOST_STEP}_PENDING`;
export const UPDATE_MOST_STEP_FULFILLED = `${UPDATE_MOST_STEP}_FULFILLED`;
export const UPDATE_MOST_STEP_REJECTED = `${UPDATE_MOST_STEP}_REJECTED`;

export function updateMOSTStep(mostStepId, model) {
  return {
    type: UPDATE_MOST_STEP,
    payload: {
      promise: http.put(`most-steps/${mostStepId}`, model),
      data: mostStepId,
    },
  };
}
