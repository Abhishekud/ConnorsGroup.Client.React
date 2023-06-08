export const CANCEL_EDIT_CHARACTERISTIC_SET = 'CANCEL_EDIT_CHARACTERISTIC_SET';

export function cancelEditCharacteristicSet(characteristicSetId) {
  return {
    type: CANCEL_EDIT_CHARACTERISTIC_SET,
    payload: characteristicSetId,
  };
}
