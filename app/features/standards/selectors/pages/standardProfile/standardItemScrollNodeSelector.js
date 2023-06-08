import {createSelector} from 'reselect';
import memoize from 'lodash/memoize';
import scrollNodesSelector from './scrollNodesSelector';

export default createSelector(
  scrollNodesSelector,
  scrollNodes => memoize(nodeId => scrollNodes.get(`standard-item-${nodeId}`))
);
