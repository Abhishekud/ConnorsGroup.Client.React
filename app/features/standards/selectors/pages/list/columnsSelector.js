import {createSelector} from 'reselect';
import columnConfigurationSelector from './columnConfigurationSelector';

export default createSelector(
  columnConfigurationSelector,
  config => config.filter(c => c.get('included'))
);
