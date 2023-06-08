export default function (characteristic, characteristicSetId) {
  return characteristic.update('characteristicSetValues', characteristicSetValues => {
    const index = characteristicSetValues.findIndex(cc => cc.get('characteristicSetId') === characteristicSetId);
    return index >= 0 ? characteristicSetValues.delete(index) : characteristicSetValues;
  });
}
