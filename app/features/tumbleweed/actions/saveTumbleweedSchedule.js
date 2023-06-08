import {http} from '../../shared/services';

export const SAVE_TUMBLEWEED_SCHEDULE = 'SAVE_TUMBLEWEED_SCHEDULE';
export const SAVE_TUMBLEWEED_SCHEDULE_PENDING = `${SAVE_TUMBLEWEED_SCHEDULE}_PENDING`;
export const SAVE_TUMBLEWEED_SCHEDULE_FULFILLED = `${SAVE_TUMBLEWEED_SCHEDULE}_FULFILLED`;
export const SAVE_TUMBLEWEED_SCHEDULE_REJECTED = `${SAVE_TUMBLEWEED_SCHEDULE}_REJECTED`;

export function saveTumbleweedSchedule(model) {
  return {
    type: SAVE_TUMBLEWEED_SCHEDULE,
    payload: http.put('tumbleweed/schedules', model),
  };
}
