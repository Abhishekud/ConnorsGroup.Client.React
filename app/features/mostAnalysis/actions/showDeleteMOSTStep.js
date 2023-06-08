export const SHOW_DELETE_MOST_STEP = 'SHOW_DELETE_MOST_STEP';

export function showDeleteMOSTStep(mostStep) {
  return {
    type: SHOW_DELETE_MOST_STEP,
    payload: mostStep,
  };
}
