export const SHOW_MOVE_MOST_STEP_TO_POSITION = 'SHOW_MOVE_MOST_STEP_TO_POSITION';

export function showMoveMOSTStepToPosition(mostStepId) {
  return {
    type: SHOW_MOVE_MOST_STEP_TO_POSITION,
    payload: {mostStepId},
  };
}
