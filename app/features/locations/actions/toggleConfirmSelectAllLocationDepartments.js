export const TOGGLE_CONFIRM_SELECT_ALL_LOCATION_DEPARTMENTS = 'TOGGLE_CONFIRM_SELECT_ALL_LOCATION_DEPARTMENTS';

export function toggleConfirmSelectAllLocationDepartments(toggleConfirmModel) {
  return {
    type: TOGGLE_CONFIRM_SELECT_ALL_LOCATION_DEPARTMENTS,
    payload: toggleConfirmModel,
  };
}
