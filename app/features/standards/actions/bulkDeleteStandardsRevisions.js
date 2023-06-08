import {http} from '../../shared/services';

export const BULK_DELETE_STANDARDS_REVISIONS = 'BULK_DELETE_STANDARDS_REVISIONS';
export const BULK_DELETE_STANDARDS_REVISIONS_PENDING = `${BULK_DELETE_STANDARDS_REVISIONS}_PENDING`;
export const BULK_DELETE_STANDARDS_REVISIONS_FULFILLED = `${BULK_DELETE_STANDARDS_REVISIONS}_FULFILLED`;
export const BULK_DELETE_STANDARDS_REVISIONS_REJECTED = `${BULK_DELETE_STANDARDS_REVISIONS}_REJECTED`;

export function bulkDeleteStandardsRevisions(model) {
  return {
    type: BULK_DELETE_STANDARDS_REVISIONS,
    payload: http.post('standards/bulk-delete-standards-revisions', model),
  };
}
