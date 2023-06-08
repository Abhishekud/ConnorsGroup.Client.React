export const CANCEL_EDIT_MOST_STEP = 'CANCEL_EDIT_MOST_STEP';

export function cancelEditMOSTStep(mostStepId) {
  return {
    type: CANCEL_EDIT_MOST_STEP,
    payload: mostStepId,
  };
}
