import {http} from '../../../shared/services';

export const LOAD_LABOR_DRIVER = 'LOAD_KRONOS_LABOR_DRIVER';
export const LOAD_LABOR_DRIVER_PENDING = `${LOAD_LABOR_DRIVER}_PENDING`;
export const LOAD_LABOR_DRIVER_REJECTED = `${LOAD_LABOR_DRIVER}_REJECTED`;
export const LOAD_LABOR_DRIVER_FULFILLED = `${LOAD_LABOR_DRIVER}_FULFILLED`;

export function loadLaborDriver(id) {
  return {
    type: LOAD_LABOR_DRIVER,
    payload: http.get(`/kronos/labordriver/${id}`),
  };
}
