import {http} from '../../shared/services';

export const UPDATE_ELEMENT_ACTIVITY = 'UPDATE_ELEMENT_ACTIVITY';
export const UPDATE_ELEMENT_ACTIVITY_PENDING = `${UPDATE_ELEMENT_ACTIVITY}_PENDING`;
export const UPDATE_ELEMENT_ACTIVITY_FULFILLED = `${UPDATE_ELEMENT_ACTIVITY}_FULFILLED`;
export const UPDATE_ELEMENT_ACTIVITY_REJECTED = `${UPDATE_ELEMENT_ACTIVITY}_REJECTED`;

export function updateActivity(activity) {
  return {
    type: UPDATE_ELEMENT_ACTIVITY,
    payload: http.put(`element-activities/${activity.get('id')}`, activity),
  };
}
