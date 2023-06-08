import {createSelector} from 'reselect';
import standardRevisionsListSelector from './standardRevisionsListSelector';

export default createSelector(
  standardRevisionsListSelector,
  standardRevisions => standardRevisions.count() !== 0 && !standardRevisions.some(s => !s.get('selected'))
);
