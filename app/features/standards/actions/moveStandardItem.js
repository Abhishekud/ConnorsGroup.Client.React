import {http} from '../../shared/services';

export const MOVE_STANDARD_ITEM = 'MOVE_STANDARD_ITEM';
export const MOVE_STANDARD_ITEM_PENDING = `${MOVE_STANDARD_ITEM}_PENDING`;
export const MOVE_STANDARD_ITEM_FULFILLED = `${MOVE_STANDARD_ITEM}_FULFILLED`;
export const MOVE_STANDARD_ITEM_REJECTED = `${MOVE_STANDARD_ITEM}_REJECTED`;

export function moveStandardItem(standardId, standardItemId, model) {
  return {
    type: MOVE_STANDARD_ITEM,
    payload: http.put(`standards/${standardId}/items/${standardItemId}/move`, model),
  };
}
