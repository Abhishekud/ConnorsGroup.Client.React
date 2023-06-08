import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import volumeDriverMappingSetsSelector from './volumeDriverMappingSetsSelector';
import DefaultCell from '../../../components/DefaultCell';
import lockedColumnsSelector from './lockedColumnsSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';

export default createSelector(
  hiddenColumnsSelector,
  lockedColumnsSelector,
  volumeDriverMappingSetsSelector,
  columnOrderSelector,
  (hiddenColumns, lockedColumns, volumeDriverMappingSets, columnOrder) => {

    const staticColumns =
      fromJS([{
        width: 300,
        field: 'volumeDriverName',
        title: 'Volume Driver',
        editable: false,
        filterable: true,
        sortable: true,
      }, {
        width: 300,
        field: 'unitOfMeasureName',
        title: 'Unit Of Measure',
        editable: false,
        filterable: true,
        sortable: true,
      }, {
        width: 300,
        field: 'description',
        title: 'Description',
        editable: false,
        filterable: true,
        sortable: true,
      }]);


    const volumeDriverMappingSetsColumns = volumeDriverMappingSets.map((volumeDriverMappingSetsKey, index) => Map({
      width: 150,
      field: `${volumeDriverMappingSetsKey.get('id')}`,
      key: {index},
      title: volumeDriverMappingSetsKey.get('name'),
      included: false,
      filterable: true,
      filter: 'numeric',
      sortable: true,
      cell: DefaultCell,
    })
    );

    const lockedColumnsCount = lockedColumns.size;
    const columns = staticColumns
      .concat(volumeDriverMappingSetsColumns)
      .withMutations(allColumnsArray => {
        allColumnsArray.map(col =>
          col
            .set('included', !hiddenColumns.has(col.get('columnId') || col.get('field')))
            .set('locked', col.get('field') === 'selected' || lockedColumns.has(col.get('columnId') || col.get('field')))
            .set('lockable', lockedColumnsCount < ALLOWED_MAX_COLUMN_LOCKS)
        );
      });

    let columnOrderIndex = 0;
    const lockedList = columns.filter(c => c.get('locked')).map(c => c.set('orderIndex', columnOrderIndex++));
    const unLockedList = columns.filter(c => !c.get('locked') && c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    const hiddenList = columns.filter(c => !c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    let mergedColumns = lockedList.concat(unLockedList);
    if (columnOrder.size > 0) {
      mergedColumns = columnOrder.concat(hiddenList);
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  }
);
