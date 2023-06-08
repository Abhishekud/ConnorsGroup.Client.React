import {Map} from 'immutable';
import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import dataSourceSelector from './dataSourceSelector';

const hiddenColumnSelector = createSelector(
  pageSelector,
  page => page.get('hiddenColumns')
);

export default createSelector(
  hiddenColumnSelector,
  dataSourceSelector,
  (hiddenColumn, dataSource) => {
    if (hiddenColumn.get(dataSource)) {
      return hiddenColumn.get(dataSource);
    }
    return new Map();
  }
);
