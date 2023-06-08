import {http} from '../../../shared/services';

export const LOAD_STORE_ATTRIBUTES_STATUS = 'REFLEXIS/STORE_ATTRIBUTE_STATUSES/LOAD';
export const LOAD_STORE_ATTRIBUTES_STATUS_PENDING = `${LOAD_STORE_ATTRIBUTES_STATUS}_PENDING`;
export const LOAD_STORE_ATTRIBUTES_STATUS_FULFILLED = `${LOAD_STORE_ATTRIBUTES_STATUS}_FULFILLED`;
export const LOAD_STORE_ATTRIBUTES_STATUS_REJECTED = `${LOAD_STORE_ATTRIBUTES_STATUS}_REJECTED`;

export function loadStoreAttributeStatuses(endpointId, id, filter, sort, skip) {
  const model = {integrationRequestId: id, endpointId, filter, sort, skip};
  return {
    type: LOAD_STORE_ATTRIBUTES_STATUS,
    payload: http.post(`reflexis/endpoints/${endpointId}/requests/${id}/store-attributes`, model),
  };
}
