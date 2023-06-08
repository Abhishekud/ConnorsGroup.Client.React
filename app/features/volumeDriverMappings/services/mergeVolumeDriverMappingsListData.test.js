import {mergeVolumeDriverMappingsListData} from './';
const {describe, test, beforeAll, expect} = global;
import _ from 'lodash';

/**
 * Scenario: VolumeDriverMapping merges with VolumeDriverMappingSet and set values
 * Note: Considering 5 Volume Driver Mapping sets with a list of 6 Volume Driver Mappings
 * Given 6 Volume Driver Mappings
 * And   5 Volume Driver Mapping Sets
 * When Volume driver mappings list api response is received
 * And  MergeVolumeDriverMappingData service is called
 * Then Volume Driver Mapping merges with volume driver mapping set values and indexes are added
 * Example:
 * <Refer to volumeDriverMappingsList for input>
 * Output:-
 *  [
      {
        '125': 2,
        '152': 0,
        '153': 1,
        '154': 2,
        '155': 3,
        index: 0,
        id: 968,
        volumeDriverId: 392,
        unitOfMeasureId: 14185,
        volumeDriverName: '10 am vol driver',
        unitOfMeasureName: '10 am UOM'
      },
      {
        '125': 0,
        '152': 0,
        '153': 1,
        '154': 2,
        '155': 3,
        index: 1,
        id: 969,
        volumeDriverId: 392,
        unitOfMeasureId: 14186,
        volumeDriverName: '11 am vol driver',
        unitOfMeasureName: '11 am UOM'
      },
      {
        '125': 7,
        '152': 0,
        '153': 1,
        '154': 2,
        '155': 3,
        index: 2,
        id: 970,
        volumeDriverId: 393,
        unitOfMeasureId: 14187,
        volumeDriverName: '12 am vol driver',
        unitOfMeasureName: '12 am UOM'
      },
      {
        '125': 5,
        '152': 0,
        '153': 1,
        '154': 2,
        '155': 3,
        index: 3,
        id: 971,
        volumeDriverId: 394,
        unitOfMeasureId: 14188,
        volumeDriverName: '13 am vol driver',
        unitOfMeasureName: '13 am UOM'
      },
      {
        '125': 3,
        '152': 0,
        '153': 1,
        '154': 2,
        '155': 3,
        index: 4,
        id: 972,
        volumeDriverId: 395,
        unitOfMeasureId: 14189,
        volumeDriverName: '14 am vol driver',
        unitOfMeasureName: '14 am UOM'
      },
      {
        '125': 8,
        '152': 0,
        '153': 1,
        '154': 2,
        '155': 3,
        index: 5,
        id: 973,
        volumeDriverId: 396,
        unitOfMeasureId: 14190,
        volumeDriverName: '16 am vol driver',
        unitOfMeasureName: '16 am UOM'
      }
    ]
 */
describe('VolumeDriverMapping merges correctly with VolumeDriverMappingSet', () => {
  let volumeDriverMappingsData;
  let volumeDriverMappingsList;
  let mergedVolumeDriverMappingsData;
  const skip = 0;


  beforeAll(() => {
    volumeDriverMappingsList = {
      total: 6,
      departmentId: 100,
      volumeDriverMappings: [
        {
          id: 968,
          volumeDriverId: 392,
          unitOfMeasureId: 14185,
          volumeDriverName: '10 am vol driver',
          unitOfMeasureName: '10 am UOM',
          volumeDriverMappingSetValues: {125: 2, 152: 0, 153: 1, 154: 2, 155: 3},
        },
        {
          id: 969,
          volumeDriverId: 392,
          unitOfMeasureId: 14186,
          volumeDriverName: '11 am vol driver',
          unitOfMeasureName: '11 am UOM',
          volumeDriverMappingSetValues: {125: 0, 152: 0, 153: 1, 154: 2, 155: 3},
        },
        {
          id: 970,
          volumeDriverId: 393,
          unitOfMeasureId: 14187,
          volumeDriverName: '12 am vol driver',
          unitOfMeasureName: '12 am UOM',
          volumeDriverMappingSetValues: {125: 7, 152: 0, 153: 1, 154: 2, 155: 3},
        },
        {
          id: 971,
          volumeDriverId: 394,
          unitOfMeasureId: 14188,
          volumeDriverName: '13 am vol driver',
          unitOfMeasureName: '13 am UOM',
          volumeDriverMappingSetValues: {125: 5, 152: 0, 153: 1, 154: 2, 155: 3},
        },
        {
          id: 972,
          volumeDriverId: 395,
          unitOfMeasureId: 14189,
          volumeDriverName: '14 am vol driver',
          unitOfMeasureName: '14 am UOM',
          volumeDriverMappingSetValues: {125: 3, 152: 0, 153: 1, 154: 2, 155: 3},
        },
        {
          id: 973,
          volumeDriverId: 396,
          unitOfMeasureId: 14190,
          volumeDriverName: '16 am vol driver',
          unitOfMeasureName: '16 am UOM',
          volumeDriverMappingSetValues: {125: 8, 152: 0, 153: 1, 154: 2, 155: 3},
        },
      ],
    };
    volumeDriverMappingsData = new Array(volumeDriverMappingsList.total).fill().map((e, i) => ({index: i}));
    mergedVolumeDriverMappingsData = mergeVolumeDriverMappingsListData(volumeDriverMappingsList.volumeDriverMappings, volumeDriverMappingsData, skip);
  });

  test('Check if volumeDriverMappingSet ids [125, 152, 153, 154, 155] exists on all rows', () => {
    mergedVolumeDriverMappingsData.forEach(vdm => {
      expect(vdm).toHaveProperty('125');
      expect(vdm).toHaveProperty('152');
      expect(vdm).toHaveProperty('153');
      expect(vdm).toHaveProperty('154');
      expect(vdm).toHaveProperty('155');
    });
  });

  test('Check if index is present on all volumeDriveMappings', () => {
    mergedVolumeDriverMappingsData.forEach(vdm => {
      expect(vdm).toHaveProperty('index');
    });
  });

  test('Check if volumeDriverMapping 1st and 5th row contains correct value for volumeDriverMappingSet id 125', () => {
    const firstRow = _.first(mergedVolumeDriverMappingsData);
    const lastRow = _.last(mergedVolumeDriverMappingsData);
    expect(firstRow['125']).toEqual(_.first(volumeDriverMappingsList.volumeDriverMappings)['125']);
    expect(lastRow['125']).toEqual(_.last(volumeDriverMappingsList.volumeDriverMappings)['125']);
  });

  test('Check if total number of volumeDriverMapping rows are equal to total number of rows returned by api', () => {
    expect(volumeDriverMappingsList.total).toEqual(mergedVolumeDriverMappingsData.length);
  });

  test('Check if volumeDriverMapping rows size is equal to 11', () => {
    mergedVolumeDriverMappingsData.forEach(vdm => {
      expect(Object.keys(vdm).length).toEqual(11);
    });
  });

  test('Check if volumeDriverMapping rows does not contain setSplitter attribute', () => {
    mergedVolumeDriverMappingsData.forEach(vdm => {
      expect(vdm).not.toHaveProperty('setSplitter');
    });
  });

  //Checks if last volumeDriverMapping row does not contain id, volumeDriverName, unitOfMeasureId after merging
  test('Check if last volumeDriverMapping row does not contain data when total is 7 and volumeDriveMappings are 6', () => {
    // Update test Data
    volumeDriverMappingsList.total = 7;
    volumeDriverMappingsData = new Array(volumeDriverMappingsList.total).fill().map((e, i) => ({index: i}));
    mergedVolumeDriverMappingsData = mergeVolumeDriverMappingsListData(volumeDriverMappingsList.volumeDriverMappings, volumeDriverMappingsData, skip);

    const lastRowData = _.last(mergedVolumeDriverMappingsData);
    expect(lastRowData).not.toHaveProperty('id');
    expect(lastRowData).not.toHaveProperty('volumeDriverName');
    expect(lastRowData).not.toHaveProperty('unitOfMeasureId');
  });

});
