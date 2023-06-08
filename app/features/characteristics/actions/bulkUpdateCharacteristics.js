import {http} from '../../shared/services';

export const BULK_UPDATE_CHARACTERISTICS = 'BULK_UPDATE_CHARACTERISTIC';
export const BULK_UPDATE_CHARACTERISTICS_PENDING = `${BULK_UPDATE_CHARACTERISTICS}_PENDING`;
export const BULK_UPDATE_CHARACTERISTICS_FULFILLED = `${BULK_UPDATE_CHARACTERISTICS}_FULFILLED`;
export const BULK_UPDATE_CHARACTERISTICS_REJECTED = `${BULK_UPDATE_CHARACTERISTICS}_REJECTED`;

export function bulkUpdateCharacteristics(characteristic, selectedBulkEditCharacteristicSetId, filter, departmentId, allCharacteristicsSelected, characteristicSetIds) {
  const ids = selectedBulkEditCharacteristicSetId.map(Number);
  const bulkCharacteristicsSetValues = characteristic.get(ids[0]).get('characteristicSetValues');
  const status = characteristic.get(ids[0]).get('status');
  const updateStatus = characteristic.get(ids[0]).get('updateStatus');

  const modelData = {bulkCharacteristicsSetValues, status, UpdateStatus: updateStatus, selectedIds: ids,
    filter, departmentId, allCharacteristicsSelected, characteristicSetIds};
  return {
    type: BULK_UPDATE_CHARACTERISTICS,
    payload: http.put('characteristics/bulk-update', modelData),
  };
}
