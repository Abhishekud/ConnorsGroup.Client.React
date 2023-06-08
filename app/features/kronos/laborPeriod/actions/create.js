import {http} from '../../../shared/services';

export const CREATE_LABOR_PERIOD = 'CREATE_KRONOS_LABOR_PERIOD';
export const CREATE_LABOR_PERIOD_PENDING = `${CREATE_LABOR_PERIOD}_PENDING`;
export const CREATE_LABOR_PERIOD_FULFILLED = `${CREATE_LABOR_PERIOD}_FULFILLED`;
export const CREATE_LABOR_PERIOD_REJECTED = `${CREATE_LABOR_PERIOD}_REJECTED`;

export function create(period) {
  return {
    type: CREATE_LABOR_PERIOD,
    payload: http.post('kronos/laborperiod', period),
  };
}
