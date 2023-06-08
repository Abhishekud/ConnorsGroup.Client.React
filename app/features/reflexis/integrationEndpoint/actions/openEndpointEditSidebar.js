import {http} from '../../../shared/services';

export const OPEN_ENDPOINT_EDIT_SIDEBAR = 'REFLEXIS/INTEGRATION_ENDPOINT/OPEN_EDIT_SIDEBAR';

export const OPEN_ENDPOINT_EDIT_SIDEBAR_PENDING = `${OPEN_ENDPOINT_EDIT_SIDEBAR}_PENDING`;
export const OPEN_ENDPOINT_EDIT_SIDEBAR_FULFILLED = `${OPEN_ENDPOINT_EDIT_SIDEBAR}_FULFILLED`;
export const OPEN_ENDPOINT_EDIT_SIDEBAR_REJECTED = `${OPEN_ENDPOINT_EDIT_SIDEBAR}_REJECTED`;

export function openEndpointEditSidebar(endpointId) {
  return {
    type: OPEN_ENDPOINT_EDIT_SIDEBAR,
    payload: http.get(`reflexis/endpoints/${endpointId}`),
  };
}
