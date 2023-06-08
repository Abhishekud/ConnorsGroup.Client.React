import {http} from '../../shared/services';

export const LOAD_TUMBLEWEED_LOGS = 'LOAD_TUMBLEWEED_LOGS';
export const LOAD_TUMBLEWEED_LOGS_PENDING = `${LOAD_TUMBLEWEED_LOGS}_PENDING`;
export const LOAD_TUMBLEWEED_LOGS_REJECTED = `${LOAD_TUMBLEWEED_LOGS}_REJECTED`;
export const LOAD_TUMBLEWEED_LOGS_FULFILLED = `${LOAD_TUMBLEWEED_LOGS}_FULFILLED`;

export function loadTumbleweedLogs(scheduleType) {
  return {
    type: LOAD_TUMBLEWEED_LOGS,
    payload: http.get(`tumbleweed/schedules/logs?scheduleType=${scheduleType}`),
  };
}
