import {createSelector} from 'reselect';
import elementsSelector from './elementsSelector';

export default createSelector(
  elementsSelector,
  elements => elements.filter(e => e.get('selected'))
);
