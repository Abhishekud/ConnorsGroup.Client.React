export const SHOW_DUPLICATE_ALLOWANCE = 'SHOW_DUPLICATE_ALLOWANCE';

export function showDuplicateAllowance(allowanceId, model) {
  return {
    type: SHOW_DUPLICATE_ALLOWANCE,
    payload: {allowanceId, model},
  };
}
