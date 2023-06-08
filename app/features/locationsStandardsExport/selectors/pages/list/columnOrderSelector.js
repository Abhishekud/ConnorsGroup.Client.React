import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import dataSourceSelector from './dataSourceSelector';
import {List} from 'immutable';

const columnReorder = createSelector(
  pageSelector,
  page => page.get('columnOrder')
);

export default createSelector(
  columnReorder,
  dataSourceSelector,
  (order, dataSource) => {
    if (order.get(dataSource)) {
      return order.get(dataSource);
    }
    return List();
  }
);
