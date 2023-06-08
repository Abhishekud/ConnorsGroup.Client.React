import {http} from '../../../shared/services';

export const IMPORT_KRONOS_LABOR_DRIVERS = 'IMPORT_KRONOS_LABOR_DRIVERS';
export const IMPORT_KRONOS_LABOR_DRIVERS_PENDING = `${IMPORT_KRONOS_LABOR_DRIVERS}_PENDING`;
export const IMPORT_KRONOS_LABOR_DRIVERS_FULFILLED = `${IMPORT_KRONOS_LABOR_DRIVERS}_FULFILLED`;
export const IMPORT_KRONOS_LABOR_DRIVERS_REJECTED = `${IMPORT_KRONOS_LABOR_DRIVERS}_REJECTED`;

export function importLaborDrivers(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_KRONOS_LABOR_DRIVERS,
    payload: http.post('kronos/labordriver/import', data),
  };
}
