export const SHOW_CREATE_ALLOWANCE_TIME = 'SHOW_CREATE_ALLOWANCE_TIME';

export function showCreateAllowanceTime(allowanceId, allowanceTimeType) {
  return {
    type: SHOW_CREATE_ALLOWANCE_TIME,
    payload: {allowanceId, allowanceTimeType},
  };
}
