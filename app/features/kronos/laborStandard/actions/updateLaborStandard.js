import {http} from '../../../shared/services';

export const UPDATE_LABOR_STANDARD = 'UPDATE_KRONOS_LABOR_STANDARDS';
export const UPDATE_LABOR_STANDARD_PENDING = `${UPDATE_LABOR_STANDARD}_PENDING`;
export const UPDATE_LABOR_STANDARD_FULFILLED = `${UPDATE_LABOR_STANDARD}_FULFILLED`;
export const UPDATE_LABOR_STANDARD_REJECTED = `${UPDATE_LABOR_STANDARD}_REJECTED`;

export function updateLaborStandard(model) {
  return {
    type: UPDATE_LABOR_STANDARD,
    payload: http.post('kronos/laborstandard/update', model),
  };
}
