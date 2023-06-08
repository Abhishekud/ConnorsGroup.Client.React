import {http} from '../../shared/services';

export const ACCEPT_TERMS = 'ACCEPT_TERMS';
export const ACCEPT_TERMS_PENDING = `${ACCEPT_TERMS}_PENDING`;
export const ACCEPT_TERMS_FULFILLED = `${ACCEPT_TERMS}_FULFILLED`;
export const ACCEPT_TERMS_REJECTED = `${ACCEPT_TERMS}_REJECTED`;

export function acceptTerms() {
  return {
    type: ACCEPT_TERMS,
    payload: http.post('authentication/accept-terms'),
  };
}
