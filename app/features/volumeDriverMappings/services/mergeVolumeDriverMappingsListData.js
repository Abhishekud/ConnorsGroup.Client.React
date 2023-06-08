import {List} from 'immutable';
/**
   * Description: Accept volumeDriverMappings, volumeDriverMappingsData array and skip,
   * merges volumeDriverMappings list with volumeDriverMappings sets and returns volumeDriverMappingsData after merging.
   * @param {*} volumeDriverMappings - Contains list of volumeDriverMappings including volume driver mappings sets lists.
   * @param {*} volumeDriverMappingsData - Array of volumeDriverMappingsData with length equal to the total number of volumeDriverMappings records.
   * @param {*} skip - The position in the array where the volumeDriverMappings rows will be added.
   * @returns Array of volumeDriverMappings data merged with volumeDriverMappings sets.
   */

export default function (volumeDriveMappings, volumeDriverMappingsData, skip) {
  const newData = [];
  List(volumeDriveMappings).forEach((dataKey, primaryIndex) => {
    const dynamicRowCols = dataKey.volumeDriverMappingSetValues;
    delete dataKey.volumeDriverMappingSetValues;
    newData[primaryIndex] = dataKey;
    if (dynamicRowCols) {
      for (const id in dynamicRowCols) {
        if (id) {
          newData[primaryIndex][id] = dynamicRowCols[id];
        }
      }
    }
  });

  newData.forEach((volumeDriveMapping, i) => {
    volumeDriverMappingsData[i + skip] = {index: i + skip, ...volumeDriveMapping};
  });
  return volumeDriverMappingsData;
}
