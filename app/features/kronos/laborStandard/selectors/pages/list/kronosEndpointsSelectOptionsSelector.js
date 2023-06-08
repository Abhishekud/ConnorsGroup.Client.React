import {createSelector} from 'reselect';
import {Map} from 'immutable';
import pageSelector from './pageSelector';

export default createSelector(
  pageSelector,
  page => page.get('kronosEndpoints')
    .toList()
    .map(ep => Map({
      value: ep.get('id'), label: ep.get('name')}))
    .insert(0, Map({value: '', label: 'Select Kronos Endpoint'}))
);
