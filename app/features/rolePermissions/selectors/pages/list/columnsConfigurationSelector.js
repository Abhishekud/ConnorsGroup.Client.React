import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import roleSelector from './rolesSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';

const columnWidth = title => title.length * 7 + 60;

export default createSelector(
  roleSelector,
  hiddenColumnsSelector,
  columnOrderSelector,
  (roles, hiddenColumns, columnOrder) => {
    const roleColumns =
      roles.map(a =>
        Map({
          field: `role_${a.get('id')}`,
          title: a.get('name'),
          width: Math.max(columnWidth(a.get('name')), 130),
          sortable: false,
          filterable: true,
          editor: 'boolean',
        })
      ).toList()
        .sortBy(a => a.get('name'));

    const initialColumns = fromJS([
      {field: 'section', title: 'Section', editable: false, filterable: true, sortable: true, width: 150, minResizableWidth: 150, locked: true},
      {field: 'page', title: 'Page', editable: false, filterable: true, sortable: true, width: 250, minResizableWidth: 250, locked: true},
      {field: 'name', title: 'Permission', editable: false, filterable: true, sortable: true, width: 225, minResizableWidth: 225, locked: true},
    ]);
    let columns = initialColumns
      .concat(roleColumns)
      .map(col => col.set('included', !hiddenColumns.has(col.get('field'))));

    for (const order of columnOrder) {
      columns = columns.splice(order.get('oldIndex'), 1).splice(order.get('newIndex'), 0, columns.get(order.get('oldIndex')));
    }

    return columns;
  }
);
