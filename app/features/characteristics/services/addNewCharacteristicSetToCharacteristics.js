export default function (characteristic, characteristicValuesByCharacteristicId) {
  const characteristicValue = characteristicValuesByCharacteristicId.get(characteristic.id);
  characteristic.characteristicSetValues.push(characteristicValue.toJS());
  characteristic[characteristicValue.get('characteristicSetId')] = characteristicValue.get('value');
  characteristic[`neverSpecified${characteristicValue.get('characteristicSetId')}`] = characteristicValue.get('neverSpecified');
  return characteristic;
}
