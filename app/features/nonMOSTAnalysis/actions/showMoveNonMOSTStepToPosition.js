export const SHOW_MOVE_NON_MOST_STEP_TO_POSITION = 'SHOW_MOVE_NON_MOST_STEP_TO_POSITION';

export function showMoveNonMOSTStepToPosition(nonMOSTStepId) {
  return {
    type: SHOW_MOVE_NON_MOST_STEP_TO_POSITION,
    payload: {nonMOSTStepId},
  };
}
