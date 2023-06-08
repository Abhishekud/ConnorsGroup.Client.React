import {createSelector} from 'reselect';
import standardRevisionsSelector from './standardRevisionsSelector';

export default createSelector(
  standardRevisionsSelector,
  standardRevisions => standardRevisions.filter(standardRevision => standardRevision.get('selected'))
);
