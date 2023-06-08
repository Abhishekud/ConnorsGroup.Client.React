export const SHOW_DELETE_SELECTED_STANDARDS = 'SHOW_DELETE_SELECTED_STANDARDS';

export function showDeleteSelectedStandards(standardData) {
  return {
    type: SHOW_DELETE_SELECTED_STANDARDS,
    payload: standardData,
  };
}
