import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import orgHierarchyLevelsSelector from '../../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';
import {
  BoolYesNoCell,
  BoolYesNoFilterCell,
  NumericFilterCell,
  KronosItemExportStatusCell,
  KronosItemExportStatusFilterCell,
} from '../../../../../customizableGrid/components';
import {
  StaleFilterCell,
  StaleCell,
  StandardIdCellWithHyperLink,
} from '../../../components';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../../customizableGrid/constants/columnConfigurations';
import {departmentNameSelector, locationNameSelector} from '../../../../../shared/selectors/components/settings';

const columnWidth = title => title.length * 7 + 60;

const columns = createSelector(
  orgHierarchyLevelsSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  columnOrderSelector,
  departmentNameSelector,
  locationNameSelector,
  (orgHierarchyLevels, hiddenColumns, lockedColumns, columnOrder, departmentName, locationName) => {
    const primaryColumns =
     fromJS([
       {
         field: 'selected',
         width: 50,
         required: true,
         included: true,
         sortable: false,
         filterable: false,
       },
       {
         field: 'staleStandard',
         title: ' ',
         editable: false,
         required: true,
         filterable: true,
         sortable: true,
         width: 90,
         filterCell: StaleFilterCell,
         cell: StaleCell,
       },
       {
         field: 'laborStandardName',
         title: 'Labor Standard',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'standardId',
         title: 'Standard Id',
         cell: StandardIdCellWithHyperLink,
         filterCell: NumericFilterCell,
         filter: 'numeric',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'standardName',
         title: 'Standard',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'description',
         title: 'Description',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       }]);

    const secondaryColumns =
     fromJS([
       {
         field: 'locationName',
         title: locationName,
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'department',
         title: departmentName,
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'genericDepartment',
         title: 'Generic Department',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'volumeDriverName',
         title: 'Volume Driver',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'timeValue',
         title: 'Time Value (Minutes)',
         filter: 'numeric',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'timeUnit',
         title: 'Time Unit',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'combinedDistribution',
         title: 'Combined Distribution',
         cell: BoolYesNoCell,
         filterCell: BoolYesNoFilterCell,
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'laborDriver',
         title: 'Labor Driver',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'laborPeriod',
         title: 'Labor Period',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'task',
         title: 'Task',
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'updatedDate',
         title: 'Last Updated',
         editable: false,
         filterable: true,
         filter: 'date',
         sortable: true,
         width: 200,
         format: '{0:yyyy-MM-dd HH:mm:ss}',
       },
       {
         field: 'success',
         title: 'Export Status',
         cell: KronosItemExportStatusCell,
         filterCell: KronosItemExportStatusFilterCell,
         editable: false,
         filterable: true,
         sortable: true,
         width: 200,
       },
       {
         field: 'exportStartTime',
         title: 'Last Exported',
         editable: false,
         filterable: true,
         filter: 'date',
         sortable: true,
         width: 200,
         format: '{0:yyyy-MM-dd HH:mm:ss}',
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

    const lockedColumnsCount = lockedColumns.size;
    const columns = primaryColumns
      .concat(orgHierarchyColumns)
      .concat(secondaryColumns)
      .withMutations(allColumnsArray => {
        allColumnsArray.map(col =>
          col
            .set('included', !hiddenColumns.has(col.get('columnId') || col.get('field')))
            .set('locked', col.get('field') === 'staleStandard' || col.get('field') === 'selected' || lockedColumns.has(col.get('columnId') || col.get('field')))
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

// Returns a function that the page component can use. The Kronos labor
// standards are kept within the component state for performance reasons.
export default createSelector(
  columns,
  columns => (allSelected, selectionRender) => columns.setIn([0, 'headerSelectionValue'], allSelected).setIn([0, 'cell'], selectionRender));
