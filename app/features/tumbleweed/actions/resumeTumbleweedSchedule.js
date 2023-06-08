import {http} from '../../shared/services';

export const RESUME_TUMBLEWEED_SCHEDULE = 'RESUME_TUMBLEWEED_SCHEDULE';
export const RESUME_TUMBLEWEED_SCHEDULE_PENDING = `${RESUME_TUMBLEWEED_SCHEDULE}_PENDING`;
export const RESUME_TUMBLEWEED_SCHEDULE_FULFILLED = `${RESUME_TUMBLEWEED_SCHEDULE}_FULFILLED`;
export const RESUME_TUMBLEWEED_SCHEDULE_REJECTED = `${RESUME_TUMBLEWEED_SCHEDULE}_REJECTED`;

export function resumeTumbleweedSchedule(scheduleType) {
  return {
    type: RESUME_TUMBLEWEED_SCHEDULE,
    payload: http.put('tumbleweed/resume', {scheduleType}),
  };
}
