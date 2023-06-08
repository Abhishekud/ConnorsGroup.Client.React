export const SHOW_CREATE_ATTRIBUTE = 'SHOW_CREATE_ATTRIBUTE';

export function showCreateAttribute(departmentId, departmentName) {
  return {
    type: SHOW_CREATE_ATTRIBUTE,
    payload: {departmentId, departmentName},
  };
}
