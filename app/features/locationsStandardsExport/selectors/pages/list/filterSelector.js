import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import dataSourceSelector from './dataSourceSelector';

const filteringSelector = createSelector(
  pageSelector,
  page => page.get('filters')
);

export default createSelector(
  filteringSelector,
  dataSourceSelector,
  (filter, dataSource) => {
    if (filter.has(dataSource)) {
      return filter.get(dataSource);
    }
    return null;
  }
);
