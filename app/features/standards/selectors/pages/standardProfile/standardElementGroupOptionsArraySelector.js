import {createSelector} from 'reselect';
import standardItemsSelector from './standardItemsSelector';
import {STANDARD_ELEMENT_GROUP} from '../../../constants/standardItemTypes';

export default createSelector(
  standardItemsSelector,
  standardItems => {
    const list = standardItems
      .filter(si => si.get('type') === STANDARD_ELEMENT_GROUP)
      .sortBy(si => si.get('index'))
      .valueSeq()
      .map(si => ({value: si.get('id'), label: si.get('name')}))
      .toArray();
    list.unshift({value: '', label: ''});
    return list;
  }
);
