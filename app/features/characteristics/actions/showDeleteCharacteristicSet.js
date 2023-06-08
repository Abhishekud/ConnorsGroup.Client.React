export const SHOW_DELETE_CHARACTERISTIC_SET = 'SHOW_DELETE_CHARACTERISTIC_SET';

export function showDeleteCharacteristicSet(characteristicSet) {
  return {
    type: SHOW_DELETE_CHARACTERISTIC_SET,
    payload: characteristicSet,
  };
}
