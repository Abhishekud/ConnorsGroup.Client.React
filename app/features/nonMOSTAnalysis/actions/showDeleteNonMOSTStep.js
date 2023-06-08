export const SHOW_DELETE_NON_MOST_STEP = 'SHOW_DELETE_NON_MOST_STEP';

export function showDeleteNonMOSTStep(mostStep) {
  return {
    type: SHOW_DELETE_NON_MOST_STEP,
    payload: mostStep,
  };
}
