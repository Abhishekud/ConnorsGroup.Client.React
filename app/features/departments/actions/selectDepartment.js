export const SELECT_DEPARTMENT = 'SELECT_DEPARTMENT';

export function selectDepartment(department) {
  return {
    type: SELECT_DEPARTMENT,
    payload: department,
  };
}
