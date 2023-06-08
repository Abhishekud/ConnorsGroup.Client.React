export const SELECT_BULK_CHARACTERISTIC = 'SELECT_BULK_CHARACTERISTIC';

export function selectBulkEditCharacteristic(selectedCharacteristic, characteristicSetId, characteristic) {
  return {
    type: SELECT_BULK_CHARACTERISTIC,
    payload: {
      selectedCharacteristic,
      characteristicSetId: characteristicSetId || null,
      characteristic,
    },
  };
}
