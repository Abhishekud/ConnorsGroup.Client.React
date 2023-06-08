import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import departmentsSelector from './departmentsSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import {locationNameSelector} from '../../../../shared/selectors/components/settings';
import orgHierarchyLevelsSelector from '../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';
import {
  ActiveCell,
  LocationStatusCell,
  ActiveFilterCell,
} from '../../../../customizableGrid/components';
import kronosEnabledSelector from '../../../../kronos/shared/selectors/kronosEnabledSelector';
import {canEditProfilingLocationsSelector} from '../../../../authentication/selectors/currentUser';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';

const columnWidth = title => title.length * 7 + 60;

const columns = createSelector(
  departmentsSelector,
  locationNameSelector,
  orgHierarchyLevelsSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  columnOrderSelector,
  kronosEnabledSelector,
  canEditProfilingLocationsSelector,
  (departments, locationName, orgHierarchyLevels, hiddenColumns, lockedColumns, columnOrder, kronosEnabled, canEdit) => {

    const departmentColumns = departments.map(dep =>
      Map({
        field: `department_${dep.get('id')}`,
        title: dep.get('name'),
        filterable: true,
        sortable: false,
        editor: 'boolean',
        className: canEdit ? '' : 'disabled-input',
        width: Math.max(columnWidth(dep.get('name')), 175),
      })).toList();

    const systemColumns =
      fromJS([{
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
      }, {
        field: 'locationProfileName',
        title: `${locationName} Profile`,
        editable: false,
        filterable: true,
        sortable: true,
        width: 200,
      }, {
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
          field: `orgHierarchyLevel_${ohl.get('id')}`,
          title: ohl.get('name'),
          width: Math.max(columnWidth(ohl.get('name')), 200),
          editable: false,
          filterable: true,
          sortable: true,
        })
      ).toList();

    const activeColumns = fromJS([
      {
        field: 'selected',
        filterable: false,
        required: true,
        included: canEdit,
      },
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
    ]);

    const kronosColumn = fromJS([{
      field: 'kronosSitePath',
      title: 'Kronos Site Path',
      editable: false,
      filterable: true,
      sortable: true,
      width: 200,
    }]);

    let columnArray = activeColumns
      .concat(systemColumns)
      .concat(orgHierarchyColumns)
      .concat(departmentColumns);
    if (kronosEnabled) {
      columnArray = columnArray.concat(kronosColumn);
    }

    const lockedColumnsCount = lockedColumns.size;
    const columns = columnArray.withMutations(allColumnsArray => {
      allColumnsArray.map(col =>
        col
          .set('included', !hiddenColumns.has(col.get('columnId') || col.get('field')))
          .set('locked', col.get('field') === 'selected' || col.get('columnId') === 'activeSymbol' || lockedColumns.has(col.get('columnId') || col.get('field')))
          .set('lockable', lockedColumnsCount < ALLOWED_MAX_COLUMN_LOCKS)
      );
    });

    let columnOrderIndex = 0;
    const lockedList = columns.filter(c => c.get('locked')).map(c => c.set('orderIndex', columnOrderIndex++));
    const unLockedList = columns.filter(c => !c.get('locked') && c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    const hiddenColumnsList = columns.filter(c => !c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));

    let mergedColumns = lockedList.concat(unLockedList);
    if (columnOrder.size > 0) {
      mergedColumns = columnOrder.concat(hiddenColumnsList);
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  }
);

// Returns a function that the page component can use.
export default createSelector(
  columns,
  columns =>
    (allSelected, selectionRender) => columns.setIn([0, 'headerSelectionValue'], allSelected).setIn([0, 'cell'], selectionRender)
);

