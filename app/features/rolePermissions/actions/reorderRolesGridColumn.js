export const REORDER_ROLES_GRID_COLUMN = 'REORDER_ROLES_GRID_COLUMN';

export function reorderRolesGridColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_ROLES_GRID_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
