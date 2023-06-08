export const CANCEL_CREATE_CHARACTERISTIC = 'CANCEL_CREATE_CHARACTERISTIC';

export function cancelCreateCharacteristic() {
  return {
    type: CANCEL_CREATE_CHARACTERISTIC,
  };
}
