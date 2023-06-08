import {createSelector} from 'reselect';
import standardRevisionsSelector from './standardRevisionsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS} from 'immutable';
import {filterBy, orderBy} from '@progress/kendo-data-query';

export default createSelector(
  standardRevisionsSelector,
  sortSelector,
  filterSelector,
  (standardRevisions, sort, filter) => {
    const f = filter === null ? null : filter.toJS();
    return fromJS(orderBy(filterBy(standardRevisions.toJS(), f), sort.toJS()));
  }
);
