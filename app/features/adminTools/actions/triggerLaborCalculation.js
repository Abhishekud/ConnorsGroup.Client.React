import {http} from '../../shared/services';

export const TRIGGER_LABOR_CALCULATION = 'ADMIN_TOOLS/TRIGGER_LABOR_CALCULATION';
export const TRIGGER_LABOR_CALCULATION_PENDING = `${TRIGGER_LABOR_CALCULATION}_PENDING`;
export const TRIGGER_LABOR_CALCULATION_FULFILLED = `${TRIGGER_LABOR_CALCULATION}_FULFILLED`;
export const TRIGGER_LABOR_CALCULATION_REJECTED = `${TRIGGER_LABOR_CALCULATION}_REJECTED`;

export function triggerLaborCalculation() {
  return {
    type: TRIGGER_LABOR_CALCULATION,
    payload: http.post('labor/calculate'),
  };
}
