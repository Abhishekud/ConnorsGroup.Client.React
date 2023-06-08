import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import elementsSelector from './elementsSelector';
import headerSelectionValueSelector from './headerSelectionValueSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import {NumericFilterCell, NameWrapCell} from '../../../../customizableGrid/components';
import {ElementTimeCell, ElementIdCell, ElementTypeCell, ElementApplicatorInstructionsCell} from '../../../components';
import {canElementsEditSelector} from '../../../../authentication/selectors/currentUser';
import lockedColumnsSelector from './lockedColumnsSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';
const staticColumns =
fromJS([{
  width: 100,
  field: 'id',
  title: 'ID',
  filterable: true,
  filter: 'numeric',
  filterCell: NumericFilterCell,
  cell: ElementIdCell,
  sortable: true,
}, {
  width: 150,
  field: 'elementTypeAbbreviated',
  title: 'Type',
  cell: ElementTypeCell,
  filterable: true,
  sortable: true,
}, {
  width: 400,
  field: 'name',
  title: 'Name',
  cell: NameWrapCell,
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'elementUnitOfMeasureName',
  title: 'Unit of Measure',
  filterable: true,
  sortable: true,
}, {
  width: 300,
  field: 'elementActivityName',
  title: 'Activity',
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'status',
  title: 'Status',
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'measuredTimeMeasurementUnits',
  title: 'Time',
  filterable: true,
  filter: 'numeric',
  cell: ElementTimeCell,
  sortable: true,
}, {
  width: 150,
  field: 'applicatorInstructions',
  title: 'App. Inst.',
  cell: ElementApplicatorInstructionsCell,
  filterable: true,
  sortable: true,
}]);

export default createSelector(
  elementsSelector,
  headerSelectionValueSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  columnOrderSelector,
  canElementsEditSelector,
  (data, headerCheckbox, hiddenColumns, lockedColumns, columnOrder, canElementsEdit) => {

    const activeColumns = canElementsEdit
      ? fromJS([{
        width: 50,
        field: 'selected',
        required: true,
        headerSelectionValue: headerCheckbox,
        filterable: false,
      }])
      : fromJS([]);

    const lockedColumnsCount = lockedColumns.size;
    const columns = activeColumns
      .concat(staticColumns)
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
      mergedColumns = columnOrder.concat(hiddenList)
        .map(c => (c.get('field') === 'selected' ? c.set('headerSelectionValue', headerCheckbox) : c));
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  }
);
