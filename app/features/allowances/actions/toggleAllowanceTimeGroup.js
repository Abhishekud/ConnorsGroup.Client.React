export const TOGGLE_ALLOWANCE_TIME_GROUP = 'TOGGLE_ALLOWANCE_TIME_GROUP';

export function toggleAllowanceTimeGroup(allowanceTimeType) {
  return {
    type: TOGGLE_ALLOWANCE_TIME_GROUP,
    payload: allowanceTimeType,
  };
}
