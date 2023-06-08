import {http} from '../../shared/services';

export const DELETE_TUMBLEWEED_SCHEDULE = 'DELETE_TUMBLEWEED_SCHEDULE';
export const DELETE_TUMBLEWEED_SCHEDULE_PENDING = `${DELETE_TUMBLEWEED_SCHEDULE}_PENDING`;
export const DELETE_TUMBLEWEED_SCHEDULE_FULFILLED = `${DELETE_TUMBLEWEED_SCHEDULE}_FULFILLED`;
export const DELETE_TUMBLEWEED_SCHEDULE_REJECTED = `${DELETE_TUMBLEWEED_SCHEDULE}_REJECTED`;

export function deleteTumbleweedSchedule(scheduleType) {
  return {
    type: DELETE_TUMBLEWEED_SCHEDULE,
    payload: http.delete(`tumbleweed/schedules?scheduleType=${scheduleType}`),
  };
}
