export const TOGGLE_ROLE_GRID_COLUMN_VISIBILITY = 'TOGGLE_ROLE_GRID_COLUMN_VISIBILITY';
export const TOGGLE_ROLE_GRID_COLUMN_VISIBILITY_FULFILLED = `${TOGGLE_ROLE_GRID_COLUMN_VISIBILITY}_FULFILLED`;

export function toggleRoleGridColumnVisibility(field, visibility) {
  return {
    type: TOGGLE_ROLE_GRID_COLUMN_VISIBILITY,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleRoleGridColumnVisibility;
