import {http} from '../../shared/services';

export const CREATE_ELEMENT_ACTIVITY = 'CREATE_ELEMENT_ACTIVITY';
export const CREATE_ELEMENT_ACTIVITY_PENDING = `${CREATE_ELEMENT_ACTIVITY}_PENDING`;
export const CREATE_ELEMENT_ACTIVITY_FULFILLED = `${CREATE_ELEMENT_ACTIVITY}_FULFILLED`;
export const CREATE_ELEMENT_ACTIVITY_REJECTED = `${CREATE_ELEMENT_ACTIVITY}_REJECTED`;

export function createActivity(model) {
  return {
    type: CREATE_ELEMENT_ACTIVITY,
    payload: http.post('element-activities', model),
  };
}
