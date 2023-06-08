import {List} from 'immutable';
/**
 * Description: Accept characteristicsList, characteristicsData array and skip,
 * merges characteristic list with characteristics sets and returns characteristicsData after merging.
 * @param {*} characteristicsList - Contains list of characteristics including characteristics sets lists.
 * @param {*} characteristicsData - Array of characteristicsData with length equal to the total number of characteristic records.
 * @param {*} skip - The position in the array where the characteristics rows will be added.
 * @returns Array of characteristic data merged with characteristics sets.
 */
export default function (characteristicsList, characteristicsSetSpecifiedValues, characteristicsData, skip) {
  const newData = [];
  List(characteristicsList).forEach((dataKey, primaryIndex) => {
    newData[primaryIndex] = dataKey;
    newData[primaryIndex].neverSpecified = true;
    const dynamicRowCols = dataKey.characteristicSetValues;
    const neverSpecifiedValues = [];
    const setValues = characteristicsSetSpecifiedValues.filter(item => (
      item.characteristicId === dataKey.id
    )).map(item => {
      neverSpecifiedValues[item.characteristicSetId] = item.neverSpecified;
      return item;
    });
    newData[primaryIndex].characteristicSetValues = setValues;
    if (dynamicRowCols) {
      for (const id in dynamicRowCols) {
        if (id) {
          newData[primaryIndex][id] = dynamicRowCols[id];
          newData[primaryIndex][`neverSpecified${id}`] = neverSpecifiedValues[id];
        }
      }
    }
  });

  newData.forEach((characteristic, i) => {
    characteristicsData[i + skip] = {index: i + skip, ...characteristic};
  });
  return characteristicsData;
}
