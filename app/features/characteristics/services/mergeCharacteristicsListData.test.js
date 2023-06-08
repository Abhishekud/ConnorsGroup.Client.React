import {mergeCharacteristicsListData} from './';
const {describe, test, expect, beforeAll} = global;

describe('Test merging of charactersitcs with charactertics set and neverspecifed flag', () => {
  let characteristicsData;
  let characteristicsList;
  let mergedCharacteristicsData;
  const skip = 0;


  beforeAll(() => {
    characteristicsList = {
      'characteristics': [{
        'id': 46500,
        'name': 'AVG_CATERING_ORDERS_PER_WEEK',
        'definition': '',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 2,
          '2840': 1.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 46504,
        'name': 'AVG_TIME_WORK_PLANOGRAMS_SEAFOOD',
        'definition': 'FIXED_TIME_Average time spent per week updating planograms. For the dedicated department',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 0,
          '2840': 0.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 46505,
        'name': 'AVG_ITEMS_PER_BOX',
        'definition': 'AVERAGE NUMBER OF ITEMS PER SHIPMENT BOX',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 0.5,
          '2840': 2.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 46506,
        'name': 'AVG_NUM_DIRECTIVE_SECTIONS',
        'definition': 'AVERAGE NUMBER OF SECTIONS FOR DIRECTIVES WEEKLY',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 10,
          '2840': 3.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 14658,
        'name': 'AVG_TIME_PROCESS_ORDER',
        'definition': '',
        'departmentId': 65,
        'status': 'Inactive',
        'characteristicSetValues': {
          '2839': 10,
          '2840': 3.4,
          'setSplitter': 0,
        },
      },
      ],
      'characteristicsSetSpecifiedValues': [
        {
          'characteristicId': 46500,
          'characteristicSetId': 2839,
          'neverSpecified': true,
        },
        {
          'characteristicId': 46500,
          'characteristicSetId': 2840,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46504,
          'characteristicSetId': 2839,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46504,
          'characteristicSetId': 2840,
          'neverSpecified': true,
        },
        {
          'characteristicId': 46505,
          'characteristicSetId': 2839,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46505,
          'characteristicSetId': 2840,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46506,
          'characteristicSetId': 2839,
          'neverSpecified': true,
        },
        {
          'characteristicId': 46506,
          'characteristicSetId': 2840,
          'neverSpecified': true,
        },
      ],
      'total': 6,
    };
    characteristicsData = new Array(characteristicsList.total).fill().map((e, i) => ({index: i}));
    mergedCharacteristicsData = mergeCharacteristicsListData(characteristicsList.characteristics, characteristicsList.characteristicsSetSpecifiedValues, characteristicsData, skip);
  });

  // Check if characteristics contain neverSpecified value for characteristic set id - 2839 after merging and has correct values
  test('Check if neverSpecified value for set id - 2839 exists and has correct value after Merging', () => {
    expect(mergedCharacteristicsData[0]).toHaveProperty('neverSpecified2839', true);
    expect(mergedCharacteristicsData[1]).toHaveProperty('neverSpecified2839', false);
    expect(mergedCharacteristicsData[2]).toHaveProperty('neverSpecified2839', false);
  });

  // Check if characteristics  contain value for characteristic set id 2839 after merging
  test('Check if characteristic set id 2839 is present after Merging', () => {
    expect(mergedCharacteristicsData[1]).toHaveProperty('2839', 0);
    expect(mergedCharacteristicsData[2]).toHaveProperty('2839', 0.5);
    expect(mergedCharacteristicsData[3]).toHaveProperty('2839', 10);
  });

  // Check if all characteristics contain index after merging
  test('Check if index is present after Merging', () => {
    expect(mergedCharacteristicsData[2]).toHaveProperty('index');
    expect(mergedCharacteristicsData[3]).toHaveProperty('index');
  });

  // Check if last characteristics row does not contain id, name, active attributes after merging
  test('Check if last characteristics row does not contain characteristics data', () => {
    expect(mergedCharacteristicsData[5]).not.toHaveProperty('id');
    expect(mergedCharacteristicsData[5]).not.toHaveProperty('name');
    expect(mergedCharacteristicsData[5]).not.toHaveProperty('active');
  });
});

describe('Test merging of charactersitcs without charactertics set and neverspecifed flag', () => {
  let characteristicsData;
  let characteristicsList;
  let mergedCharacteristicsData;
  const skip = 0;


  beforeAll(() => {
    characteristicsList = {
      'characteristics': [{
        'id': 46500,
        'name': 'AVG_CATERING_ORDERS_PER_WEEK',
        'definition': '',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 46504,
        'name': 'AVG_TIME_WORK_PLANOGRAMS_SEAFOOD',
        'definition': 'FIXED_TIME_Average time spent per week updating planograms. For the dedicated department',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 46505,
        'name': 'AVG_ITEMS_PER_BOX',
        'definition': 'AVERAGE NUMBER OF ITEMS PER SHIPMENT BOX',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 46506,
        'name': 'AVG_NUM_DIRECTIVE_SECTIONS',
        'definition': 'AVERAGE NUMBER OF SECTIONS FOR DIRECTIVES WEEKLY',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 14658,
        'name': 'AVG_TIME_PROCESS_ORDER',
        'definition': '',
        'departmentId': 65,
        'status': 'Inactive',
        'characteristicSetValues': {},
      },
      ],
      'characteristicsSetSpecifiedValues': [],
      'total': 6,
    };
    characteristicsData = new Array(characteristicsList.total).fill().map((e, i) => ({index: i}));
    mergedCharacteristicsData = mergeCharacteristicsListData(characteristicsList.characteristics, characteristicsList.characteristicsSetSpecifiedValues, characteristicsData, skip);
  });

  test('Check if characteristics does not contain neverSpecified value(for characteristic set id 2839) after merging ', () => {
    expect(mergedCharacteristicsData[0]).not.toHaveProperty('neverSpecified2839');
    expect(mergedCharacteristicsData[1]).not.toHaveProperty('neverSpecified2839');
  });


  test('Check if characteristics does not contain value for characteristic set id 2839 after merging', () => {
    expect(mergedCharacteristicsData[0]).not.toHaveProperty('2839');
    expect(mergedCharacteristicsData[3]).not.toHaveProperty('2839');
  });

});


describe('Test merging of charactersitcs with charactertics set and without neverspecifed flag', () => {
  let characteristicsData;
  let characteristicsList;
  let mergedCharacteristicsData;
  const skip = 0;


  beforeAll(() => {
    characteristicsList = {
      'characteristics': [{
        'id': 46500,
        'name': 'AVG_CATERING_ORDERS_PER_WEEK',
        'definition': '',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 2,
          '2840': 1.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 46504,
        'name': 'AVG_TIME_WORK_PLANOGRAMS_SEAFOOD',
        'definition': 'FIXED_TIME_Average time spent per week updating planograms. For the dedicated department',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 0,
          '2840': 0.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 46505,
        'name': 'AVG_ITEMS_PER_BOX',
        'definition': 'AVERAGE NUMBER OF ITEMS PER SHIPMENT BOX',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 0.5,
          '2840': 2.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 46506,
        'name': 'AVG_NUM_DIRECTIVE_SECTIONS',
        'definition': 'AVERAGE NUMBER OF SECTIONS FOR DIRECTIVES WEEKLY',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {
          '2839': 10,
          '2840': 3.4,
          'setSplitter': 0,
        },
      },
      {
        'id': 14658,
        'name': 'AVG_TIME_PROCESS_ORDER',
        'definition': '',
        'departmentId': 65,
        'status': 'Inactive',
        'characteristicSetValues': {
          '2839': 10,
          '2840': 3.4,
          'setSplitter': 0,
        },
      },
      ],
      'characteristicsSetSpecifiedValues': [],
      'total': 6,
    };
    characteristicsData = new Array(characteristicsList.total).fill().map((e, i) => ({index: i}));
    mergedCharacteristicsData = mergeCharacteristicsListData(characteristicsList.characteristics, characteristicsList.characteristicsSetSpecifiedValues, characteristicsData, skip);
  });

  test('Check if characteristics does not contain neverSpecified value(for characteristic set id 2839) after merging ', () => {
    expect(mergedCharacteristicsData[0].neverSpecified2839).toBeUndefined();
    expect(mergedCharacteristicsData[1].neverSpecified2839).toBeUndefined();
  });

  test('Check if characteristics contain value for characteristic set id 2839 after merging', () => {
    expect(mergedCharacteristicsData[0]).toHaveProperty('2839');
    expect(mergedCharacteristicsData[3]).toHaveProperty('2839');
  });
});

describe('Test merging of charactersitcs without charactertics set and with neverspecifed flag', () => {
  let characteristicsData;
  let characteristicsList;
  let mergedCharacteristicsData;
  const skip = 0;


  beforeAll(() => {
    characteristicsList = {
      'characteristics': [{
        'id': 46500,
        'name': 'AVG_CATERING_ORDERS_PER_WEEK',
        'definition': '',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 46504,
        'name': 'AVG_TIME_WORK_PLANOGRAMS_SEAFOOD',
        'definition': 'FIXED_TIME_Average time spent per week updating planograms. For the dedicated department',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 46505,
        'name': 'AVG_ITEMS_PER_BOX',
        'definition': 'AVERAGE NUMBER OF ITEMS PER SHIPMENT BOX',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 46506,
        'name': 'AVG_NUM_DIRECTIVE_SECTIONS',
        'definition': 'AVERAGE NUMBER OF SECTIONS FOR DIRECTIVES WEEKLY',
        'departmentId': 1808,
        'status': 'Active',
        'characteristicSetValues': {},
      },
      {
        'id': 14658,
        'name': 'AVG_TIME_PROCESS_ORDER',
        'definition': '',
        'departmentId': 65,
        'status': 'Inactive',
        'characteristicSetValues': {},
      },
      ],
      'characteristicsSetSpecifiedValues': [
        {
          'characteristicId': 46500,
          'characteristicSetId': 2839,
          'neverSpecified': true,
        },
        {
          'characteristicId': 46500,
          'characteristicSetId': 2840,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46504,
          'characteristicSetId': 2839,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46504,
          'characteristicSetId': 2840,
          'neverSpecified': true,
        },
        {
          'characteristicId': 46505,
          'characteristicSetId': 2839,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46505,
          'characteristicSetId': 2840,
          'neverSpecified': false,
        },
        {
          'characteristicId': 46506,
          'characteristicSetId': 2839,
          'neverSpecified': true,
        },
        {
          'characteristicId': 46506,
          'characteristicSetId': 2840,
          'neverSpecified': true,
        },
      ],
      'total': 6,
    };
    characteristicsData = new Array(characteristicsList.total).fill().map((e, i) => ({index: i}));
    mergedCharacteristicsData = mergeCharacteristicsListData(characteristicsList.characteristics, characteristicsList.characteristicsSetSpecifiedValues, characteristicsData, skip);
  });
  test('Check if characteristics does not contain neverSpecified value (for characteristic set id 2839) after merging ', () => {
    expect(typeof mergedCharacteristicsData[0]).not.toHaveProperty('neverSpecified2839');
    expect(typeof mergedCharacteristicsData[1]).not.toHaveProperty('neverSpecified2839');
  });

  test('Check if characteristics does not contain value for characteristic set id 2839 after merging', () => {
    expect(mergedCharacteristicsData[0]).not.toHaveProperty('2839');
    expect(mergedCharacteristicsData[3]).not.toHaveProperty('2839');
  });
});
