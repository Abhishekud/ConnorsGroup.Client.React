export const SHOW_DUPLICATE_STANDARD = 'SHOW_DUPLICATE_STANDARD';

export function showDuplicateStandard(standardId, model) {
  return {
    type: SHOW_DUPLICATE_STANDARD,
    payload: {standardId, model},
  };
}
