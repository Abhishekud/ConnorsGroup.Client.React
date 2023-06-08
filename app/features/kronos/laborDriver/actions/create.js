import {http} from '../../../shared/services';

export const CREATE = 'CREATE_KRONOS_LABOR_DRIVER';
export const CREATE_FULFILLED = `${CREATE}_FULFILLED`;
export const CREATE_PENDING = `${CREATE}_PENDING`;
export const CREATE_REJECTED = `${CREATE}_REJECTED`;

export function create(driver) {
  return {
    type: CREATE,
    payload: http.post('kronos/labordriver', driver),
  };
}
