import {http} from '../../shared/services';

export const RESET_SITE = 'ADMIN_TOOLS/RESET_SITE';
export const RESET_SITE_PENDING = `${RESET_SITE}_PENDING`;
export const RESET_SITE_FULFILLED = `${RESET_SITE}_FULFILLED`;
export const RESET_SITE_REJECTED = `${RESET_SITE}_REJECTED`;

export function resetSite() {
  return {
    type: RESET_SITE,
    payload: http.post('admin/reset'),
  };
}
