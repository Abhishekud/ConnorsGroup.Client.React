import {createSelector} from 'reselect';
import standardFilingFieldOptionsSelector from './standardFilingFieldOptionsSelector';

export default createSelector(
  standardFilingFieldOptionsSelector,
  sffo => sffo.toList().toJS()
);
