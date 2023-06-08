import {createSelector} from 'reselect';
import elementsSelector from './elementsSelector';

export default createSelector(
  elementsSelector,
  elements => elements.filter(elm => elm.get('selected')).keySeq().toArray()
);
