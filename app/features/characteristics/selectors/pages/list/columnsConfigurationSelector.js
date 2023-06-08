import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import visibleCharacteristicSetsColumnsSelector from './visibleCharacteristicSetsColumnsSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import allCharacteristicsSelectedSelector from './allCharacteristicsSelectedSelector';
import {CharacteristicsStatusCell, DefaultTableCell, DefaultTableHeaderCell, CharacteristicActiveFilterCell, DefaultCharacteristicsHeaderCell} from '../../../../customizableGrid/components';
import {canCharacteristicsEditSelector} from '../../../../authentication/selectors/currentUser';
import lockedColumnsSelector from './lockedColumnsSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';
import {DefaultCell} from './../../../components';

export default createSelector(
  visibleCharacteristicSetsColumnsSelector,
  hiddenColumnsSelector,
  columnOrderSelector,
  canCharacteristicsEditSelector,
  lockedColumnsSelector,
  allCharacteristicsSelectedSelector,
  (characteristicSets, hiddenColumns, columnOrder, canCharacteristicsEdit, lockedColumns, headerSelectionValue) => {

    const staticColumns =
      fromJS([{
        width: (characteristicSets.size < 2) ? 330 : 200,
        field: 'name',
        title: 'Name',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: (characteristicSets.size < 2) ? 330 : 200,
        field: 'definition',
        title: 'Definition',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }]);

    const selectedColumn = canCharacteristicsEdit ? fromJS([{
      width: 50,
      field: 'selected',
      required: true,
      filterable: false,
    }]) : fromJS([]);

    const statusColumn = fromJS([{
      width: (characteristicSets.size < 2) ? 330 : 200,
      field: 'status',
      title: 'Status',
      filterable: true,
      sortable: true,
      included: false,
      cell: CharacteristicsStatusCell,
      headerCell: DefaultTableHeaderCell,
      filterCell: CharacteristicActiveFilterCell,
    }]);

    const characteristicSetsColumns = characteristicSets.map((characteristicSetsKey, index) => Map({
      width: 200,
      field: `${characteristicSetsKey.get('id')}`,
      key: {index},
      included: false,
      title: characteristicSetsKey.get('name'),
      filterable: true,
      filter: 'numeric',
      headerCell: characteristicSetsKey.get('default') ? DefaultCharacteristicsHeaderCell : DefaultTableHeaderCell,
      cell: DefaultCell,
      sortable: true,
      default: characteristicSetsKey.get('default'),
    })
    );

    const lockedColumnsCount = lockedColumns.size;
    const columns = selectedColumn
      .concat(staticColumns)
      .concat(statusColumn)
      .concat(characteristicSetsColumns)
      .withMutations(allColumnsArray => {
        allColumnsArray.map(col =>
          col
            .set('included', !hiddenColumns.has(col.get('columnId') || col.get('field')))
            .set('locked', col.get('field') === 'selected' || col.get('columnId') === 'activeSymbol' || lockedColumns.has(col.get('columnId') || col.get('field')))
            .set('lockable', lockedColumnsCount < ALLOWED_MAX_COLUMN_LOCKS)
        );
      });

    let columnOrderIndex = 0;
    let mergedColumns;
    let defaultColumn;
    const lockedList = columns.filter(c => c.get('locked')).map(c => c.set('orderIndex', columnOrderIndex++));
    const filteredDefaultColumn = columns.filter(c => c.get('default'));

    if (filteredDefaultColumn) {
      defaultColumn = filteredDefaultColumn.map(c => c.set('orderIndex', columnOrderIndex++));
    }
    const unLockedList = columns.filter(c => !c.get('locked') && c.get('included') && !c.get('default')).map(c => c.set('orderIndex', columnOrderIndex++));
    const hiddenList = columns.filter(c => !c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));

    if (defaultColumn) {
      mergedColumns = lockedList.concat(defaultColumn).concat(unLockedList);
    } else {
      mergedColumns = lockedList.concat(unLockedList);
    }

    if (columnOrder.size) {
      const updatedDefaultSet = characteristicSetsColumns.find(c => c.get('default'));
      mergedColumns = columnOrder.concat(hiddenList).map(col => {
        if (updatedDefaultSet?.get('field') === col.get('field')) {
          return col.set('headerCell', DefaultCharacteristicsHeaderCell)
            .set('default', updatedDefaultSet.get('default'));
        }
        if (col.get('field') === 'selected') {
          return col.set('headerSelectionValue', headerSelectionValue);
        }
        return col.set('headerCell', DefaultTableHeaderCell)
          .set('default', false);
      }
      );
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  }
);
