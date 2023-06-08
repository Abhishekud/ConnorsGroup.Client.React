import {http} from '../../shared/services';

export const IMPORT_PARTS = 'IMPORT_PARTS';
export const IMPORT_PARTS_PENDING = `${IMPORT_PARTS}_PENDING`;
export const IMPORT_PARTS_FULFILLED = `${IMPORT_PARTS}_FULFILLED`;
export const IMPORT_PARTS_REJECTED = `${IMPORT_PARTS}_REJECTED`;

export function importParts(partFamilyId, file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_PARTS,
    payload: http.post(`part-families/${partFamilyId}/parts/import`, data),
  };
}
