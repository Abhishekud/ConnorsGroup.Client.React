import {http} from '../../shared/services';

export const MOVE_NON_MOST_STEP = 'MOVE_NON_MOST_STEP';
export const MOVE_NON_MOST_STEP_PENDING = `${MOVE_NON_MOST_STEP}_PENDING`;
export const MOVE_NON_MOST_STEP_FULFILLED = `${MOVE_NON_MOST_STEP}_FULFILLED`;
export const MOVE_NON_MOST_STEP_REJECTED = `${MOVE_NON_MOST_STEP}_REJECTED`;

export function moveNonMOSTStep(nonMOSTStepId, model) {
  return {
    type: MOVE_NON_MOST_STEP,
    payload: http.put(`non-most-steps/${nonMOSTStepId}/move`, model),
  };
}
