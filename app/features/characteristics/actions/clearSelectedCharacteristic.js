export const CLEAR_SELECTED_CHARACTERISTIC = 'CLEAR_SELECTED_CHARACTERISTIC';

export function clearSelectedCharacteristic() {
  return {
    type: CLEAR_SELECTED_CHARACTERISTIC,
  };
}
