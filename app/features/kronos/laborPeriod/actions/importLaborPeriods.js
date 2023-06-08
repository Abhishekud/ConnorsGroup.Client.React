import {http} from '../../../shared/services';

export const IMPORT_LABOR_PERIODS = 'IMPORT_LABOR_PERIODS';
export const IMPORT_LABOR_PERIODS_PENDING = `${IMPORT_LABOR_PERIODS}_PENDING`;
export const IMPORT_LABOR_PERIODS_FULFILLED = `${IMPORT_LABOR_PERIODS}_FULFILLED`;
export const IMPORT_LABOR_PERIODS_REJECTED = `${IMPORT_LABOR_PERIODS}_REJECTED`;

export function importLaborPeriods(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_LABOR_PERIODS,
    payload: http.post('kronos/laborperiod/import', data),
  };
}
