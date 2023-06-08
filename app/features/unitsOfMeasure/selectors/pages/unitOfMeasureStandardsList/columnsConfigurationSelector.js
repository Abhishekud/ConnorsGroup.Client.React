import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import {DefaultTableCell, DefaultTableHeaderCell} from '../../../../customizableGrid/components';

export default createSelector(
  hiddenColumnsSelector,
  columnOrderSelector,
  (hiddenColumns, columnOrder) => {

    const staticColumns =
      fromJS([{
        width: 150,
        field: 'id',
        title: 'Standard ID',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: 500,
        field: 'name',
        title: 'Standard Name',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: 400,
        field: 'attributeName',
        title: 'Attribute',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }]);

    let columns = staticColumns.map(col => col.set('included', !hiddenColumns.has(col.get('columnId') || col.get('field'))));

    for (const order of columnOrder) {
      columns = columns.splice(order.get('oldIndex'), 1).splice(order.get('newIndex'), 0, columns.get(order.get('oldIndex')));
    }
    return columns;
  }
);
