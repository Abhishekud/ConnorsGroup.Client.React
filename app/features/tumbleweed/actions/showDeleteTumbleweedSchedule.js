export const SHOW_DELETE_TUMBLEWEED_SCHEDULE = 'SHOW_DELETE_TUMBLEWEED_SCHEDULE';

export function showDeleteTumbleweedSchedule(schedule) {
  return {
    type: SHOW_DELETE_TUMBLEWEED_SCHEDULE,
    payload: schedule,
  };
}
