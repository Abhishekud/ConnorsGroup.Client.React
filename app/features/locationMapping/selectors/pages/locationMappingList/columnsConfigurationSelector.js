import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import selectedDepartmentNameSelector from './selectedDepartmentNameSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import allLocationDepartmentSelectedSelector from './allLocationDepartmentSelectedSelector';
import {locationNameSelector} from '../../../../shared/selectors/components/settings';
import orgHierarchyLevelsSelector from '../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';
import {
  ActiveCell,
  LocationStatusCell,
  ActiveFilterCell,
} from '../../../../customizableGrid/components';
import {canEditProfilingLocationsMappingSelector} from '../../../../authentication/selectors/currentUser';
import lockedColumnsSelector from './lockedColumnsSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';

const columnWidth = title => title.length * 7 + 60;

export default createSelector(
  selectedDepartmentNameSelector,
  locationNameSelector,
  orgHierarchyLevelsSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  columnOrderSelector,
  allLocationDepartmentSelectedSelector,
  canEditProfilingLocationsMappingSelector,
  (selectedDepartment, locationName, orgHierarchyLevels, hiddenColumns, lockedColumns, columnOrder, headerSelection, canEdit) => {
    const editColumns = canEdit
      ? fromJS([
        {
          field: 'selected',
          headerSelectionValue: headerSelection,
          width: 50,
          required: true,
          included: true,
          sortable: false,
          filterable: false,
        },
      ])
      : fromJS([]);

    const defaultColumns =
      fromJS([
        {
          field: 'activeSymbol',
          title: ' ',
          columnId: 'activeSymbol',
          editable: false,
          filterable: false,
          sortable: false,
          required: true,
          width: 40,
          cell: ActiveCell,
        },
        {
          field: 'name',
          title: locationName,
          editable: false,
          filterable: true,
          sortable: true,
          width: 200,
        }, {
          field: 'description',
          title: `${locationName} Description`,
          editable: false,
          filterable: true,
          sortable: true,
          width: 200,
        },
        {
          field: 'active',
          title: 'Status',
          editable: false,
          filterable: true,
          sortable: true,
          width: 140,
          cell: LocationStatusCell,
          filterCell: ActiveFilterCell,
        }]);

    const orgHierarchyColumns =
    orgHierarchyLevels.map(ohl =>
      Map({
        field: `orghierarchylevel_${ohl.get('id')}`,
        title: ohl.get('name'),
        width: Math.max(columnWidth(ohl.get('name')), 200),
        editable: false,
        filterable: true,
        sortable: true,
      })
    ).toList();

    const otherColumns =
      fromJS([{
        field: 'volumeDriverMappingSetName',
        title: 'Volume Driver Mapping Set',
        editable: false,
        filterable: true,
        sortable: true,
        width: 200,
      }, {
        field: 'characteristicSetName',
        title: 'Characteristic Set',
        editable: false,
        filterable: true,
        sortable: true,
        width: 200,
      }]);

    const lockedColumnsCount = lockedColumns.size;
    const columns = editColumns
      .concat(defaultColumns)
      .concat(orgHierarchyColumns)
      .concat(otherColumns)
      .withMutations(allColumnsArray => {
        allColumnsArray.map(col =>
          col
            .set(
              'included',
              !hiddenColumns.has(col.get('columnId') || col.get('field'))
            )
            .set('locked', col.get('field') === 'selected' || col.get('columnId') === 'activeSymbol' || lockedColumns.has(col.get('columnId') || col.get('field')))
            .set('lockable', lockedColumnsCount < ALLOWED_MAX_COLUMN_LOCKS)
        );
      });
    let columnOrderIndex = 0;
    const lockedList = columns.filter(c => c.get('locked')).map(c => c.set('orderIndex', columnOrderIndex++));
    const unLockedList = columns.filter(c => !c.get('locked') && c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    const hiddenList = columns.filter(c => !c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    let mergedColumns = lockedList.concat(unLockedList);
    if (columnOrder.size > 0) {
      mergedColumns = columnOrder.concat(hiddenList)
        .map(c => (c.get('field') === 'selected' ? c.set('headerSelectionValue', headerSelection) : c));
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  }
);
