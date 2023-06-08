const {describe, test, expect, beforeAll} = global;
import {fromJS} from 'immutable';
import toggleLockReorderColumns from './toggleLockReorderColumns';

/**
 * Scenario: 01. An unlocked column `Attribute3` is locked
 * Note: Considering 6 columns in below test as example
 * Given: 6 columns
   | Column    | Is Locked | Lockable | OrderIndex |
   | StandardId| true      | true     | 1          |
   | Location  | false     | true     | 2          |
   | Department| false     | true     | 3          |
   | Attribute1| false     | true     | 4          |
   | Attribute2| false     | true     | 5          |
   | Attribute3| false     | true     | 6          |
 * When: Column attribute3 is locked
 * Then:
   | Column    | Is Locked | Lockable | OrderIndex |
   | StandardId| true      | true     | 1          |
   | Attribute3| true      | true     | 2          |
   | Location  | false     | true     | 3          |
   | Department| false     | true     | 4          |
   | Attribute1| false     | true     | 5          |
   | Attribute2| false     | true     | 6          |
 */
describe('01. An unlocked column `Attribute3` is locked', () => {
  let field;
  let lock;
  let originalColumnsData;
  let reorderedColumnsData;

  beforeAll(() => {
    field = 'Attribute3';
    lock = true;
    originalColumnsData = fromJS([{
      field: 'StandardId',
      lockable: true,
      locked: true,
      orderIndex: 1,
    },
    {
      field: 'Location',
      lockable: true,
      locked: false,
      orderIndex: 2,
    },
    {
      field: 'Department',
      lockable: true,
      locked: false,
      orderIndex: 3,
    },
    {
      field: 'Attribute1',
      lockable: true,
      locked: false,
      orderIndex: 4,
    },
    {
      field: 'Attribute2',
      lockable: true,
      locked: false,
      orderIndex: 5,
    },
    {
      field: 'Attribute3',
      lockable: true,
      locked: false,
      orderIndex: 6,
    }]);
    reorderedColumnsData = toggleLockReorderColumns(field, lock, originalColumnsData);
  });

  test('verify if size of the final columns is correct', () => {
    expect(reorderedColumnsData.size).toEqual(originalColumnsData.size);
  });

  test('verify if the attribute locked is true for column `Attribute3`', () => {
    const lockedColumn = reorderedColumnsData.find(c => c.get('field') === field);
    expect(lockedColumn.get('locked')).toEqual(true);
  });

  // The service updates the attribute in this scenario
  test('verify if the attribute lockable is true for all columns', () => {
    reorderedColumnsData.forEach(a => expect(a.get('lockable')).toEqual(true));
  });

  test('verify if `Attribute3` orderIndex is updated to 2', () => {
    const lockedColumn = reorderedColumnsData.find(c => c.get('field') === field);
    expect(lockedColumn.get('orderIndex')).toEqual(2);
  });

});

/**
 * Scenario: 02. An locked column `Attribute3` is unlocked
 * Note: Considering 6 columns in below test as example
 * Given: 6 columns
   | Column    | Is Locked | Lockable | OrderIndex |
   | StandardId| true      | true     | 1          |
   | Attribute3| true      | true     | 2          |
   | Location  | true      | true     | 3          |
   | Department| false     | true     | 4          |
   | Attribute1| false     | true     | 5          |
   | Attribute2| false     | true     | 6          |
 * When: Column attribute3 is unlocked
 * Then:
   | Column    | Is Locked | Lockable | OrderIndex |
   | StandardId| true      | true     | 1          |
   | Location  | true      | true     | 2          |
   | Department| false     | true     | 3          |
   | Attribute1| false     | true     | 4          |
   | Attribute2| false     | true     | 5          |
   | Attribute3| false     | true     | 6          |

 */
describe('02. An locked column `Attribute3` is unlocked', () => {

  let field;
  let lock;
  let originalColumnsData;
  let reorderedColumnsData;

  beforeAll(() => {
    field = 'Attribute3';
    lock = false;
    originalColumnsData = fromJS([{
      field: 'StandardId',
      lockable: true,
      locked: true,
      orderIndex: 1,
    },
    {
      field: 'Attribute3',
      lockable: true,
      locked: true,
      orderIndex: 2,
    },
    {
      field: 'Location',
      lockable: true,
      locked: true,
      orderIndex: 3,
    },
    {
      field: 'Department',
      lockable: true,
      locked: false,
      orderIndex: 4,
    },
    {
      field: 'Attribute1',
      lockable: true,
      locked: false,
      orderIndex: 5,
    },
    {
      field: 'Attribute2',
      lockable: true,
      locked: false,
      orderIndex: 6,
    }]);
    reorderedColumnsData = toggleLockReorderColumns(field, lock, originalColumnsData);
  });

  test('verify if size of the final columns is correct', () => {
    expect(reorderedColumnsData.size).toEqual(originalColumnsData.size);
  });

  test('verify if the attribute locked is false for column `Attribute3`', () => {
    const lockedColumn = reorderedColumnsData.find(c => c.get('field') === field);
    expect(lockedColumn.get('locked')).toEqual(false);
  });

  test('verify if the locked column `Location` orderIndex updates correctly to 2', () => {
    const lockedColumn = reorderedColumnsData.find(c => c.get('field') === 'Location');
    expect(lockedColumn.get('orderIndex')).toEqual(2);
  });

  // The service updates the attribute in this scenario
  test('verify if the attribute lockable is true for all columns', () => {
    reorderedColumnsData.forEach(a => expect(a.get('lockable')).toEqual(true));
  });

  // Will change after making update to the service - The locked column will go back to its previous unlocked position after being unlocked
  test.skip('verify if column `Attribute3` orderIndex updates to original orderIndex [6]', () => {
    const lockedColumn = reorderedColumnsData.find(c => c.get('field') === field);
    expect(lockedColumn.get('orderIndex')).toEqual(6);
  });

});


/**
 * Scenario: 03. Maximum column lock limit is reached
 * Note: Considering 6 columns in below test as example
 * Given: 6 columns
   | Column    | Is Locked | Lockable | OrderIndex |
   | StandardId| true      | true     | 1          |
   | Attribute3| true      | true     | 2          |
   | Location  | true      | true     | 3          |
   | Department| true      | true     | 4          |
   | Attribute1| false     | true     | 5          |
   | Attribute2| false     | true     | 6          |
 * When: 4 columns are already locked
   And:  5th column Attribute1 is being locked
 * Then:
   | Column    | Is Locked | Lockable | OrderIndex |
   | StandardId| true      | false     | 1         |
   | Attribute3| true      | false     | 2         |
   | Location  | true      | false     | 3         |
   | Department| true      | false     | 4         |
   | Attribute1| true      | false     | 5         |
   | Attribute2| false     | false     | 6         |
 */
describe('03. Maximum column lock limit is reached', () => {

  let field;
  let lock;
  let originalColumnsData;
  let reorderedColumnsData;

  beforeAll(() => {
    field = 'Attribute1';
    lock = true;
    originalColumnsData = fromJS([{
      field: 'StandardId',
      lockable: true,
      locked: true,
      orderIndex: 1,
    },
    {
      field: 'Attribute3',
      lockable: true,
      locked: true,
      orderIndex: 2,
    },
    {
      field: 'Location',
      lockable: true,
      locked: true,
      orderIndex: 3,
    },
    {
      field: 'Department',
      lockable: true,
      locked: true,
      orderIndex: 4,
    },
    {
      field: 'Attribute1',
      lockable: true,
      locked: false,
      orderIndex: 5,
    },
    {
      field: 'Attribute2',
      lockable: true,
      locked: false,
      orderIndex: 6,
    }]);
    reorderedColumnsData = toggleLockReorderColumns(field, lock, originalColumnsData);
  });

  test('verify if size of the final columns is correct', () => {
    expect(reorderedColumnsData.size).toEqual(originalColumnsData.size);
  });

  test('verify if all columns lockable attribute is set to false', () => {
    reorderedColumnsData.forEach(a => expect(a.get('lockable')).toEqual(false));
  });

  test('verify if all locked columns size is equal to max allowed locked columns size[5]', () => {
    const lockedColumns = reorderedColumnsData.filter(c => c.get('locked'));
    expect(lockedColumns.size).toEqual(5);
  });

});

/**
 * Scenario: 04. Maximum column lock limit was reached and a column is being unlocked
 * Note: Considering 6 columns in below test as example
 * Given: 6 columns
   | Column    | Is Locked | Lockable  | OrderIndex |
   | StandardId| true      | false     | 1          |
   | Attribute3| true      | false     | 2          |
   | Location  | true      | false     | 3          |
   | Department| true      | false     | 4          |
   | Attribute1| true      | false     | 5          |
   | Attribute2| false     | false     | 6          |
 * When: 5th column Attribute1 is being unlocked
 * Then:
   | Column    | Is Locked | Lockable | OrderIndex |
   | StandardId| true      | true     | 1          |
   | Attribute3| true      | true     | 2          |
   | Location  | true      | true     | 3          |
   | Department| true      | true     | 4          |
   | Attribute1| false     | true     | 5          |
   | Attribute2| false     | true     | 6          |
 */
describe('04. Maximum column lock limit was reached and a column is being unlocked', () => {

  let field;
  let lock;
  let originalColumnsData;
  let reorderedColumnsData;

  beforeAll(() => {
    field = 'Attribute1';
    lock = false;
    originalColumnsData = fromJS([{
      field: 'StandardId',
      lockable: false,
      locked: true,
      orderIndex: 1,
    },
    {
      field: 'Attribute3',
      lockable: false,
      locked: true,
      orderIndex: 2,
    },
    {
      field: 'Location',
      lockable: false,
      locked: true,
      orderIndex: 3,
    },
    {
      field: 'Department',
      lockable: false,
      locked: true,
      orderIndex: 4,
    },
    {
      field: 'Attribute1',
      lockable: false,
      locked: true,
      orderIndex: 5,
    },
    {
      field: 'Attribute2',
      lockable: false,
      locked: false,
      orderIndex: 6,
    }]);
    reorderedColumnsData = toggleLockReorderColumns(field, lock, originalColumnsData);
  });

  test('verify if size of the final columns is correct', () => {
    expect(reorderedColumnsData.size).toEqual(originalColumnsData.size);
  });

  test('verify if all columns lockable attribute is set to true', () => {
    reorderedColumnsData.forEach(a => expect(a.get('lockable')).toEqual(true));
  });

  test('verify if all locked columns size is not equal to max allowed locked columns size[5]', () => {
    const lockedColumns = reorderedColumnsData.filter(c => c.get('locked'));
    expect(lockedColumns.size).not.toEqual(5);
  });

});
