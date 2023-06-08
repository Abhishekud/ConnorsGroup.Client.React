import {http} from '../../shared/services';

export const DELETE_ALL_PARTS = 'DELETE_ALL_PARTS';
export const DELETE_ALL_PARTS_PENDING = `${DELETE_ALL_PARTS}_PENDING`;
export const DELETE_ALL_PARTS_FULFILLED = `${DELETE_ALL_PARTS}_FULFILLED`;
export const DELETE_ALL_PARTS_REJECTED = `${DELETE_ALL_PARTS}_REJECTED`;

export function deleteAllParts() {
  return {
    type: DELETE_ALL_PARTS,
    payload: http.delete('part-families/delete-all-parts'),
  };
}
