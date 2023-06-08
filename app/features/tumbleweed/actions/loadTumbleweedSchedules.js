import {http} from '../../shared/services';

export const LOAD_TUMBLEWEED_SCHEDULES = 'LOAD_TUMBLEWEED_SCHEDULES';
export const LOAD_TUMBLEWEED_SCHEDULES_PENDING = `${LOAD_TUMBLEWEED_SCHEDULES}_PENDING`;
export const LOAD_TUMBLEWEED_SCHEDULES_REJECTED = `${LOAD_TUMBLEWEED_SCHEDULES}_REJECTED`;
export const LOAD_TUMBLEWEED_SCHEDULES_FULFILLED = `${LOAD_TUMBLEWEED_SCHEDULES}_FULFILLED`;

export function loadTumbleweedSchedules() {
  return {
    type: LOAD_TUMBLEWEED_SCHEDULES,
    payload: http.get('tumbleweed/schedules'),
  };
}
