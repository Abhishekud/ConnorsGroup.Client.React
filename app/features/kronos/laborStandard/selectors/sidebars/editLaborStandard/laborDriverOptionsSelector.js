import {createSelector} from 'reselect';
import {Map} from 'immutable';
import sidebarSelector from './sidebarSelector';

export default createSelector(
  sidebarSelector,
  sidebar => sidebar.get('laborDrivers').toList().map(p => Map({value: p.get('id'), label: p.get('name')})).insert(0, Map({value: '', label: ''}))
);
