import {createSelector} from 'reselect';
import pristineAttributesSelector from './pristineAttributesSelector';

export default createSelector(
  pristineAttributesSelector,
  pristineAttributes => pristineAttributes.sortBy(a => a.get('name')).valueSeq()
);
