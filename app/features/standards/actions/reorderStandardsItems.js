import {http} from '../../shared/services';

export const REORDER_STANDARDS_ITEMS = 'REORDER_STANDARDS_ITEMS';
export const REORDER_STANDARDS_ITEMS_PENDING = `${REORDER_STANDARDS_ITEMS}_PENDING`;
export const REORDER_STANDARDS_ITEMS_FULFILLED = `${REORDER_STANDARDS_ITEMS}_FULFILLED`;
export const REORDER_STANDARDS_ITEMS_REJECTED = `${REORDER_STANDARDS_ITEMS}_REJECTED`;

export function reorderStandardsItems(standardItemId, oldIndex, newIndex, droppableId) {
  const standardId = droppableId.split('-')[1];
  const model = {
    position: newIndex,
    actionType: 'position',
    insertBelow: oldIndex < newIndex,
  };

  return {
    type: REORDER_STANDARDS_ITEMS,
    payload: http.put(`standards/${standardId}/items/${standardItemId}/move`, model),
  };
}
