import {http} from '../../shared/services';

export const DELETE_ELEMENT_ACTIVITY = 'DELETE_ELEMENT_ACTIVITY';
export const DELETE_ELEMENT_ACTIVITY_PENDING = `${DELETE_ELEMENT_ACTIVITY}_PENDING`;
export const DELETE_ELEMENT_ACTIVITY_FULFILLED = `${DELETE_ELEMENT_ACTIVITY}_FULFILLED`;
export const DELETE_ELEMENT_ACTIVITY_REJECTED = `${DELETE_ELEMENT_ACTIVITY}_REJECTED`;

export function deleteActivity(activityId) {
  return {
    type: DELETE_ELEMENT_ACTIVITY,
    payload: http.delete(`element-activities/${activityId}`),
  };
}
