import {createSelector} from 'reselect';
import dataSelector from './dataSelector';
import pagingSelector from './pagingSelector';

export default createSelector(
  dataSelector,
  pagingSelector,
  (data, paging) => data.skip(paging.get('skip')).take(paging.get('take'))
);
