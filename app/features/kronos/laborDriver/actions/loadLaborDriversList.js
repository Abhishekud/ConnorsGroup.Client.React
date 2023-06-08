import {http} from '../../../shared/services';

export const LOAD_LABOR_DRIVERS_LIST = 'LOAD_KRONOS_LABOR_DRIVERS_LIST';
export const LOAD_LABOR_DRIVERS_LIST_PENDING = `${LOAD_LABOR_DRIVERS_LIST}_PENDING`;
export const LOAD_LABOR_DRIVERS_LIST_REJECTED = `${LOAD_LABOR_DRIVERS_LIST}_REJECTED`;
export const LOAD_LABOR_DRIVERS_LIST_FULFILLED = `${LOAD_LABOR_DRIVERS_LIST}_FULFILLED`;

export function loadLaborDriversList() {
  return {
    type: LOAD_LABOR_DRIVERS_LIST,
    payload: http.get('/kronos/labordriver/list'),
  };
}
