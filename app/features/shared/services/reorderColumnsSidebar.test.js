import {reorderColumnsSidebar} from '../services';
const {describe, test, expect} = global;
import {_} from 'lodash';


describe('Check the behaviour of columns after reordering action is performed', () => {
  let event;
  let reorderedColumnsData;
  let columnKey;
  let oldIndex;
  let newIndex;

  test('Check if order index of the reordered columns updates correctly based on the columnKey', () => {
    event = [{
      editable: false,
      field: 'name',
      filterable: true,
      included: true,
      lockable: true,
      locked: true,
      orderIndex: 0,
      sortable: true,
      title: 'Location',
      width: 200,
    },
    {
      editable: false,
      field: 'description',
      filterable: true,
      included: true,
      lockable: true,
      locked: true,
      orderIndex: 1,
      sortable: true,
      title: 'Location Description',
      width: 200,
    },
    {
      className: '',
      editor: 'boolean',
      field: 'attribute_3622',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 2,
      sortable: false,
      title: 'attribute',
      width: 170,
    },
    {
      editable: false,
      field: 'orghierarchylevel_1',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 3,
      sortable: true,
      title: 'Brand',
      width: 200,
    },
    {
      editable: false,
      field: 'orghierarchylevel_2',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 4,
      sortable: true,
      title: 'New Brand',
      width: 200,
    },
    {
      editable: false,
      field: 'orghierarchylevel_3',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 5,
      sortable: true,
      title: 'Newest brand',
      width: 200,
    }];
    columnKey = 'orghierarchylevel_2';
    oldIndex = 4;
    newIndex = 2;
    reorderedColumnsData = reorderColumnsSidebar(columnKey, oldIndex, newIndex, _.cloneDeep(event));

    const columnTobeUpdated = event.find(c => columnKey === c.field);
    const reorderedColumn = reorderedColumnsData.find(c => c.field === columnKey);

    expect(columnTobeUpdated.orderIndex).not.toBe(reorderedColumn.orderIndex);
    expect(reorderedColumn.orderIndex).toEqual(newIndex);

  });


  test('Check if order index of the all columns updates correctly after reordering', () => {

    columnKey = 'attribute_3622';
    oldIndex = 2;
    newIndex = 4;

    event = [{
      editable: false,
      field: 'name',
      filterable: true,
      included: true,
      lockable: true,
      locked: true,
      orderIndex: 0,
      sortable: true,
      title: 'Location',
      width: 200,
    },
    {
      editable: false,
      field: 'description',
      filterable: true,
      included: true,
      lockable: true,
      locked: true,
      orderIndex: 1,
      sortable: true,
      title: 'Location Description',
      width: 200,
    },
    {
      className: '',
      editor: 'boolean',
      field: 'attribute_3622',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 2,
      sortable: false,
      title: 'attribute',
      width: 170,
    },
    {
      editable: false,
      field: 'orghierarchylevel_1',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 3,
      sortable: true,
      title: 'Brand',
      width: 200,
    },
    {
      editable: false,
      field: 'orghierarchylevel_2',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 4,
      sortable: true,
      title: 'New Brand',
      width: 200,
    },
    {
      editable: false,
      field: 'orghierarchylevel_3',
      filterable: true,
      included: true,
      lockable: true,
      locked: false,
      orderIndex: 5,
      sortable: true,
      title: 'Newest brand',
      width: 200,
    }];

    reorderedColumnsData = reorderColumnsSidebar(columnKey, oldIndex, newIndex, _.cloneDeep(event));

    // Find if the orderIndex of column no 3 decreases by 1 if the column is between  oldIndex(2) and  newIndex(4)
    expect(reorderedColumnsData.find(c => c.field === 'orghierarchylevel_1').orderIndex).toEqual(2);

    // Find if the orderIndex of column no 4 decreases by 1
    expect(reorderedColumnsData.find(c => c.field === 'orghierarchylevel_2').orderIndex).toEqual(3);

    // Find if the orderIndex of column 2 changes to orderIndex 4
    expect(reorderedColumnsData.find(c => c.field === columnKey).orderIndex).toEqual(4);

    // Find if the orderIndex of column 1, 5 remains unchanged
    expect(reorderedColumnsData.find(c => c.orderIndex === 5).orderIndex).toEqual(5);
    expect(reorderedColumnsData.find(c => c.orderIndex === 1).orderIndex).toEqual(1);

  });
});

