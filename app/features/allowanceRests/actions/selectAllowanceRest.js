export const SELECT_ALLOWANCE_REST = 'SELECT_ALLOWANCE_REST';

export function selectAllowanceRest(allowanceRest) {
  return {
    type: SELECT_ALLOWANCE_REST,
    payload: allowanceRest,
  };
}
