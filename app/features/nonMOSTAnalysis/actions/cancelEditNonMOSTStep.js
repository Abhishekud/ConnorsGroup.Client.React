export const CANCEL_EDIT_NON_MOST_STEP = 'CANCEL_EDIT_NON_MOST_STEP';

export function cancelEditNonMOSTStep(nonMOSTStepId) {
  return {
    type: CANCEL_EDIT_NON_MOST_STEP,
    payload: nonMOSTStepId,
  };
}
