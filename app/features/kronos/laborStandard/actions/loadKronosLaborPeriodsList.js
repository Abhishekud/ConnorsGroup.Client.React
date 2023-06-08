import {http} from '../../../shared/services';

export const LOAD_KRONOS_LABOR_PERIODS_LIST = 'LOAD_KRONOS_LABOR_PERIODS_LIST';
export const LOAD_KRONOS_LABOR_PERIODS_LIST_PENDING = `${LOAD_KRONOS_LABOR_PERIODS_LIST}_PENDING`;
export const LOAD_KRONOS_LABOR_PERIODS_LIST_REJECTED = `${LOAD_KRONOS_LABOR_PERIODS_LIST}_REJECTED`;
export const LOAD_KRONOS_LABOR_PERIODS_LIST_FULFILLED = `${LOAD_KRONOS_LABOR_PERIODS_LIST}_FULFILLED`;

export function loadKronosLaborPeriodsList() {
  return {
    type: LOAD_KRONOS_LABOR_PERIODS_LIST,
    payload: http.get('/kronos/laborperiod/select-list'),
  };
}
