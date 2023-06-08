export const SHOW_DELETE_CHARACTERISTIC = 'SHOW_DELETE_CHARACTERISTIC';

export function showDeleteCharacteristic(characteristic) {
  return {
    type: SHOW_DELETE_CHARACTERISTIC,
    payload: characteristic,
  };
}
