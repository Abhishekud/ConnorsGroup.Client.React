export const SHOW_DELETE_DEPARTMENT = 'SHOW_DELETE_DEPARTMENT';

export function showDeleteDepartment(department) {
  return {
    type: SHOW_DELETE_DEPARTMENT,
    payload: department,
  };
}
