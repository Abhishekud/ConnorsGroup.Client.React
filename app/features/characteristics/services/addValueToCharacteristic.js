export default function (characteristic, characteristicValuesByCharacteristicId) {
  return characteristic.update('characteristicSetValues', characteristicSetValues => {
    const characteristicId = characteristic.get('id');
    const characteristicValue = characteristicValuesByCharacteristicId.get(characteristicId);
    return characteristicSetValues.push(characteristicValue);
  });
}
