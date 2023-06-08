import {http} from '../../../shared/services';

export const LOAD_REFLEXIS_LABOR_STANDARDS_LIST = 'REFLEXIS/LABOR_STANDARDS/LOAD_LABOR_STANDARDS';
export const LOAD_REFLEXIS_LABOR_STANDARDS_LIST_PENDING = `${LOAD_REFLEXIS_LABOR_STANDARDS_LIST}_PENDING`;
export const LOAD_REFLEXIS_LABOR_STANDARDS_LIST_FULFILLED = `${LOAD_REFLEXIS_LABOR_STANDARDS_LIST}_FULFILLED`;
export const LOAD_REFLEXIS_LABOR_STANDARDS_LIST_REJECTED = `${LOAD_REFLEXIS_LABOR_STANDARDS_LIST}_REJECTED`;

export function loadLaborStandardsList(filter, sort, skip, take) {

  return {
    type: LOAD_REFLEXIS_LABOR_STANDARDS_LIST,
    payload: http.post('reflexis/labor-standards/list', {filter, sort, skip, take}),
  };
}


