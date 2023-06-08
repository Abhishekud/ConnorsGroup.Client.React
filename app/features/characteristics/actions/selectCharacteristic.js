export const SELECT_CHARACTERISTIC = 'SELECT_CHARACTERISTIC';

export function selectCharacteristic(characteristic, characteristicSetId, columnClickTarget) {
  return {
    type: SELECT_CHARACTERISTIC,
    payload: {
      characteristic,
      characteristicSetId: characteristicSetId || null,
      columnClickTarget,
    },
  };
}
