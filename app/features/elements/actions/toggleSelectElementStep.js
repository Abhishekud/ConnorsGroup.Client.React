export const TOGGLE_SELECT_ELEMENT_STEP = 'TOGGLE_SELECT_ELEMENT_STEP';

export function toggleSelectElementStep(standardElementId) {
  return {
    type: TOGGLE_SELECT_ELEMENT_STEP,
    payload: {standardElementId},
  };
}
