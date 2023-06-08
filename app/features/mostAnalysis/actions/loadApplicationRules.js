import {http} from '../../shared/services';

export const LOAD_APPLICATION_RULES = 'LOAD_APPLICATION_RULES';
export const LOAD_APPLICATION_RULES_PENDING = `${LOAD_APPLICATION_RULES}_PENDING`;
export const LOAD_APPLICATION_RULES_FULFILLED = `${LOAD_APPLICATION_RULES}_FULFILLED`;
export const LOAD_APPLICATION_RULES_REJECTED = `${LOAD_APPLICATION_RULES}_REJECTED`;

export function loadApplicationRules(mostType) {
  return {
    type: LOAD_APPLICATION_RULES,
    payload: http.get(`application-rules/${mostType}`),
  };
}
