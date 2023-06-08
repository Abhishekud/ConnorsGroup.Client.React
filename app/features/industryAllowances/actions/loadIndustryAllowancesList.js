import {http} from '../../shared/services';

export const LOAD_INDUSTRY_ALLOWANCES_LIST = 'LOAD_INDUSTRY_ALLOWANCES_LIST';
export const LOAD_INDUSTRY_ALLOWANCES_LIST_PENDING = `${LOAD_INDUSTRY_ALLOWANCES_LIST}_PENDING`;
export const LOAD_INDUSTRY_ALLOWANCES_LIST_FULFILLED = `${LOAD_INDUSTRY_ALLOWANCES_LIST}_FULFILLED`;
export const LOAD_INDUSTRY_ALLOWANCES_LIST_REJECTED = `${LOAD_INDUSTRY_ALLOWANCES_LIST}_REJECTED`;

export function loadIndustryAllowancesList(industrySourceId) {
  return {
    type: LOAD_INDUSTRY_ALLOWANCES_LIST,
    payload: http.get(`industry-allowance/list/${industrySourceId}`),
  };
}
