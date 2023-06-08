import {http} from '../../shared/services';

export const IMPORT_JOB_CLASSES = 'IMPORT_JOB_CLASSES';
export const IMPORT_JOB_CLASSES_PENDING = `${IMPORT_JOB_CLASSES}_PENDING`;
export const IMPORT_JOB_CLASSES_FULFILLED = `${IMPORT_JOB_CLASSES}_FULFILLED`;
export const IMPORT_JOB_CLASSES_REJECTED = `${IMPORT_JOB_CLASSES}_REJECTED`;

export function importJobClasses(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_JOB_CLASSES,
    payload: http.post('job-classes/import', data),
  };
}
