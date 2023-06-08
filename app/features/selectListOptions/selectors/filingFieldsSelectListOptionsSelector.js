import {createSelector} from 'reselect';
import filingFieldsSelectListOptionsStateSelector from './filingFieldsSelectListOptionsStateSelector';

export default createSelector(
  filingFieldsSelectListOptionsStateSelector,
  modal => modal
);
