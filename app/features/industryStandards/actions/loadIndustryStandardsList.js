import {http} from '../../shared/services';

export const LOAD_INDUSTRY_STANDARDS_LIST = 'LOAD_INDUSTRY_STANDARDS_LIST';
export const LOAD_INDUSTRY_STANDARDS_LIST_PENDING = `${LOAD_INDUSTRY_STANDARDS_LIST}_PENDING`;
export const LOAD_INDUSTRY_STANDARDS_LIST_FULFILLED = `${LOAD_INDUSTRY_STANDARDS_LIST}_FULFILLED`;
export const LOAD_INDUSTRY_STANDARDS_LIST_REJECTED = `${LOAD_INDUSTRY_STANDARDS_LIST}_REJECTED`;

export function loadIndustryStandardsList(industrySourceId, intoDepartmentId) {
  return {
    type: LOAD_INDUSTRY_STANDARDS_LIST,
    payload: http.post('industry-standards/list', {
      industrySourceId,
      intoDepartmentId,
    }),
  };
}
