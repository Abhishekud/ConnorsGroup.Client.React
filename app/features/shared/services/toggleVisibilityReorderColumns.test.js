const {describe, test, expect, beforeAll} = global;
import {fromJS} from 'immutable';
import toggleVisibilityReorderColumns from './toggleVisibilityReorderColumns';

/**
 * Scenario: 01. An column `Attribute1` is hidden
 * Note: Considering 6 columns in below test as example
 * Given: 6 columns
   Visible columns
   | Column    |  Hidden   | OrderIndex|
   | StandardId| false     | 1         |
   | Location  | false     | 2         |
   | Department| false     | 3         |
   | Attribute1| false     | 4         |
   | Attribute2| false     | 5         |
   | Attribute3| false     | 6         |

   Hidden columns:
   | Column    |  Hidden   | OrderIndex|

 * When: Column Attribute1 is hidden
 * Then:
   Visible columns
   | Column    |  Hidden   | OrderIndex|
   | StandardId| false     | 1         |
   | Location  | false     | 2         |
   | Department| false     | 3         |
   | Attribute2| false     | 4         |
   | Attribute3| false     | 5         |

   Hidden columns:
   | Column    |  Hidden   | OrderIndex|
   | Attribute1| true      | 4         |
*/
describe('01. An column `Attribute1` is hidden', () => {

  const showColumn = true;
  const field = 'Attribute1';
  let originalColumnsData;
  let reorderedColumnsData;
  let columnsList;
  let selectedColumn;

  beforeAll(() => {

    originalColumnsData = fromJS([{
      field: 'StandardId',
      orderIndex: 1,
    },
    {
      field: 'Location',
      orderIndex: 2,
    },
    {
      field: 'Department',
      orderIndex: 3,
    },
    {
      field: 'Attribute1',
      orderIndex: 4,
    },
    {
      field: 'Attribute2',
      orderIndex: 5,
    },
    {
      field: 'Attribute3',
      orderIndex: 6,
    }]);

    reorderedColumnsData = toggleVisibilityReorderColumns(field, !showColumn, originalColumnsData, new Map());
    columnsList = reorderedColumnsData.columnsList;
    selectedColumn = reorderedColumnsData.selectedColumn;
  });

  /**
  * After the column is hidden its orderIndex is preserved in the hidden columns, outside of the service,
  * the service returns the column to be added in the hidden columns,
  * and the column is filtered out of the visible columns.
  */
  test('Verify if the orderIndex of column `Attribute1` is preserved', () => {
    const result = selectedColumn.find(c => c.get('field') === 'Attribute1').get('orderIndex');
    const expectedResult = originalColumnsData.find(c => c.get('field') === 'Attribute1').get('orderIndex');
    expect(result).toEqual(expectedResult);
  });

  test('Verify if the name of column being hidden is correct', () => {
    const expectedResult = selectedColumn.first().get('field');
    expect(field).toEqual(expectedResult);
  });

  test('Verify that the column `Attribute1` is removed from the visible columns', () => {
    const result = columnsList.filter(c => c.get('field') === 'Attribute1').toJS();
    const expectedResult = [];
    expect(result).toEqual(expectedResult);
  });

  test('Verify if the orderIndex of column `Attribute2` & `Attribute3` reduces by 1', () => {
    columnsList.forEach(c => {
      if (c.get('field') === 'Attribute2') {
        expect(c.get('orderIndex')).toEqual(originalColumnsData.find(c => c.get('field') === 'Attribute2').get('orderIndex') - 1);
      }
      if (c.get('field') === 'Attribute3') {
        expect(c.get('orderIndex')).toEqual(originalColumnsData.find(c => c.get('field') === 'Attribute3').get('orderIndex') - 1);
      }
    });
  });

  test('Verify if the size of the visible columns is correct', () => {
    expect(columnsList.size).toEqual(originalColumnsData.size - 1);
  });

});


/**
 * Scenario: 02. An hidden column `Attribute1` is made visible
 * Note: Considering 6 columns in below test as example
 * Given: 6 columns
   Visible columns
   | Column    |  Hidden   | OrderIndex|
   | StandardId| false     | 1         |
   | Location  | false     | 2         |
   | Department| false     | 3         |
   | Attribute2| false     | 4         |

   Hidden columns:
   | Column    |  Hidden   | OrderIndex|
   | Attribute3| true      | 6         |
   | Attribute1| true      | 4         |

 * When: Column Attribute1 is unlocked
 * Then:
   Visible columns
   | Column    |  Hidden   | OrderIndex|
   | StandardId| false     | 1         |
   | Location  | false     | 2         |
   | Department| false     | 3         |
   | Attribute1| false     | 4         |
   | Attribute2| false     | 5         |

   Hidden columns:
   | Column    |  Hidden   | OrderIndex|
   | Attribute3| true      | 6         |

 */
describe('02. An hidden column `Attribute1` is made visible', () => {

  const showColumn = true;
  const field = 'Attribute1';
  let originalColumnsData;
  let reorderedColumnsData;
  let columnsList;
  let hiddenColumnsData;

  beforeAll(() => {

    hiddenColumnsData = fromJS(
      {'Attribute1': [{
        field: 'Attribute1',
        orderIndex: 0,
      }],
      'Attribute3': [{
        field: 'Attribute3',
        orderIndex: 0,
      }]}
    );

    originalColumnsData = fromJS([{
      field: 'StandardId',
      orderIndex: 1,
    },
    {
      field: 'Location',
      orderIndex: 2,
    },
    {
      field: 'Department',
      orderIndex: 3,
    },
    {
      field: 'Attribute2',
      orderIndex: 4,
    }]);

    reorderedColumnsData = toggleVisibilityReorderColumns(field, showColumn, originalColumnsData, hiddenColumnsData);
    columnsList = reorderedColumnsData.columnsList;
  });

  // WIP - After the column `Attribute1` is unhidden its orderIndex restores to original and the column is placed after `Department` column
  test.skip('Verify if the orderIndex of column `Attribute1` updates to 4', () => {
  });

  // When the column is restored it is added back to the visible columns
  test('Verify that the column `Attribute1` is added to the visible columns', () => {
    const result = columnsList.find(c => c.get('field') === 'Attribute1');
    expect(result).not.toBeUndefined();
  });

  test('Verify if the size of the visible columns is correct', () => {
    expect(columnsList.size).toEqual(originalColumnsData.size + 1);
  });
});
