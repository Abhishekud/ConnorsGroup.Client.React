export const RESET_LOCKED_LOCATION_DEPARTMENTS = 'RESET_LOCKED_LOCATION_DEPARTMENTS';
export const RESET_LOCKED_LOCATION_DEPARTMENTS_FULFILLED = `${RESET_LOCKED_LOCATION_DEPARTMENTS}_FULFILLED`;

export function resetLockedLocationDepartments() {
  return {
    type: RESET_LOCKED_LOCATION_DEPARTMENTS,
    payload: Promise.resolve(),
  };
}

export default resetLockedLocationDepartments;
