import {http} from '../../../shared/services';

export const LOAD_LABOR_PERIOD = 'LOAD_KRONOS_LABOR_PERIOD';
export const LOAD_LABOR_PERIOD_PENDING = `${LOAD_LABOR_PERIOD}_PENDING`;
export const LOAD_LABOR_PERIOD_REJECTED = `${LOAD_LABOR_PERIOD}_REJECTED`;
export const LOAD_LABOR_PERIOD_FULFILLED = `${LOAD_LABOR_PERIOD}_FULFILLED`;

export function loadLaborPeriod(id) {
  return {
    type: LOAD_LABOR_PERIOD,
    payload: http.get(`/kronos/laborperiod/${id}`),
  };
}
