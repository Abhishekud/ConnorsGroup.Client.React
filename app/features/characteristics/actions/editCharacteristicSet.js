export const EDIT_CHARACTERISTIC_SET = 'EDIT_CHARACTERISTIC_SET';

export function editCharacteristicSet(characteristicSetId) {
  return {
    type: EDIT_CHARACTERISTIC_SET,
    payload: characteristicSetId,
  };
}
