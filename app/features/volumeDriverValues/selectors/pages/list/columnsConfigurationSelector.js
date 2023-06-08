import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import orgHierarchyLevelsSelector from '../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';
import volumeDriverValueNumericCell from '../../../components/volumeDriverValueNumericCell';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../../../shared/selectors/components/settings';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';

export default createSelector(
  orgHierarchyLevelsSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  columnOrderSelector,
  departmentNameSelector,
  locationNameSelector,
  (orgHierarchyLevels, hiddenColumns, lockedColumns, columnOrder, departmentName, locationName) => {
    const defaultColumns =
      fromJS([{
        width: 170,
        field: 'locationName',
        title: locationName,
        filterable: true,
        sortable: true,
      }, {
        width: 250,
        field: 'locationDescription',
        title: `${locationName} Description`,
        filterable: true,
        sortable: true,
      }, {
        width: 200,
        field: 'volumeDriverName',
        title: 'Volume Driver',
        filterable: true,
        sortable: true,
      }]);

    const orgHierarchyColumns =
      orgHierarchyLevels.map(ohl =>
        Map({
          field: `orghierarchylevel_${ohl.get('id')}`,
          title: ohl.get('name'),
          width: 150,
          editable: false,
          filterable: true,
          sortable: true,
        })
      ).toList();

    const otherColumns = fromJS([
      {
        width: 250,
        field: 'volumeDriverDepartmentName',
        title: departmentName,
        filterable: true,
        sortable: true,
      }, {
        width: 150,
        field: 'value',
        title: 'Value',
        filter: 'numeric',
        filterable: true,
        sortable: true,
        cell: volumeDriverValueNumericCell,
      }]);

    const lockedColumnsCount = lockedColumns.size;
    const columns = defaultColumns
      .concat(orgHierarchyColumns)
      .concat(otherColumns)
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
    if (columnOrder.size) {
      mergedColumns = columnOrder.concat(hiddenList);
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  }
);
