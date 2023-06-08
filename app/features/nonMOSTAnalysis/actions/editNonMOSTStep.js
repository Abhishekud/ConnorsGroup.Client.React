export const EDIT_NON_MOST_STEP = 'EDIT_NON_MOST_STEP';

export function editNonMOSTStep(nonMOSTStepId) {
  return {
    type: EDIT_NON_MOST_STEP,
    payload: nonMOSTStepId,
  };
}
