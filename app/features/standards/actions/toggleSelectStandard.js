export const TOGGLE_SELECT_STANDARD = 'TOGGLE_SELECT_STANDARD';

export function toggleSelectStandard(standardId) {
  return {
    type: TOGGLE_SELECT_STANDARD,
    payload: {standardId},
  };
}
