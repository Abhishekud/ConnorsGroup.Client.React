export const SHOW_EDIT_TUMBLEWEED_SCHEDULE = 'SHOW_EDIT_TUMBLEWEED_SCHEDULE';

export function showEditTumbleweedSchedule(model) {
  return {
    type: SHOW_EDIT_TUMBLEWEED_SCHEDULE,
    payload: model,
  };
}
