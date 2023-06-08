import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import {makeSelectListOptionsArraySelector} from '../../../../selectListOptions/selectors';
import {PART_FIELDS} from '../../../../selectListOptions/constants/selectListTypes';
import {DefaultTableCell} from '../../../../customizableGrid/components';

const partFieldsSelector = makeSelectListOptionsArraySelector(PART_FIELDS);

export default createSelector(
  partFieldsSelector,
  columnOrderSelector,
  hiddenColumnsSelector,
  (partFields, columnOrder, hiddenColumns) => {

    const staticColumns =
      fromJS([{
        width: 320,
        field: 'name',
        title: 'Name',
        editable: false,
        filterable: true,
        sortable: true,
      }]);

    const partFieldsColumns = partFields.map(field =>
      ((partFields.length > 4)
        ? Map({
          width: 200,
          field: (`partFieldValue${field.value}`),
          key: field.value,
          title: field.label,
          included: false,
          filterable: true,
          sortable: true,
          cell: DefaultTableCell,
        })
        : Map({
          field: (`partFieldValue${field.value}`),
          key: field.value,
          title: field.label,
          included: false,
          filterable: true,
          sortable: true,
          cell: DefaultTableCell,
        }))
    );
    let columns = staticColumns
      .concat(partFieldsColumns)
      .map(col => col.set('included', !hiddenColumns.has(col.get('columnId') || col.get('field'))));

    for (const order of columnOrder) {
      columns = columns.splice(order.get('oldIndex'), 1).splice(order.get('newIndex'), 0, columns.get(order.get('oldIndex')));
    }

    return fromJS(columns);
  }
);
