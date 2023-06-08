import {http} from '../../shared/services';

export const MOVE_MOST_STEP = 'MOVE_MOST_STEP';
export const MOVE_MOST_STEP_PENDING = `${MOVE_MOST_STEP}_PENDING`;
export const MOVE_MOST_STEP_FULFILLED = `${MOVE_MOST_STEP}_FULFILLED`;
export const MOVE_MOST_STEP_REJECTED = `${MOVE_MOST_STEP}_REJECTED`;

export function moveMOSTStep(mostStepId, model) {
  return {
    type: MOVE_MOST_STEP,
    payload: http.put(`most-steps/${mostStepId}/move`, model),
  };
}
