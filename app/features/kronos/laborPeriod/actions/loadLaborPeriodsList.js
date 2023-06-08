import {http} from '../../../shared/services';

export const LOAD_LABOR_PERIODS_LIST = 'LOAD_KRONOS_LABOR_PERIODS_LIST';
export const LOAD_LABOR_PERIODS_LIST_PENDING = `${LOAD_LABOR_PERIODS_LIST}_PENDING`;
export const LOAD_LABOR_PERIODS_LIST_REJECTED = `${LOAD_LABOR_PERIODS_LIST}_REJECTED`;
export const LOAD_LABOR_PERIODS_LIST_FULFILLED = `${LOAD_LABOR_PERIODS_LIST}_FULFILLED`;

export function loadLaborPeriodsList(filter, sort, skip, take) {
  return {
    type: LOAD_LABOR_PERIODS_LIST,
    payload: http.post('/kronos/laborperiod/list', {filter, sort, skip, take}),
  };
}
