export const SHOW_DELETE_SELECTED_ELEMENT_STEPS = 'SHOW_DELETE_SELECTED_ELEMENT_STEPS';

export function showDeleteSelectedElementSteps(standardData) {
  return {
    type: SHOW_DELETE_SELECTED_ELEMENT_STEPS,
    payload: standardData,
  };
}
