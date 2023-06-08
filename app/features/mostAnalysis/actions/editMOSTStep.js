export const EDIT_MOST_STEP = 'EDIT_MOST_STEP';

export function editMOSTStep(mostStepId) {
  return {
    type: EDIT_MOST_STEP,
    payload: mostStepId,
  };
}
