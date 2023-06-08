import {Map, List} from 'immutable';

export default function resetGridConfiguration(state, defaultLockedColumnsState) {
  return state.withMutations(map => {
    map.set('columnOrder', new List())
      .set('hiddenColumns', Map())
      .set('cachedGridConfig', Map())
      .set('lockedColumns', defaultLockedColumnsState)
      .set('isGridConfigurationProcessed', true)
      .set('showHiddenButton', false)
      .set('showResetButton', false)
      .set('showLockButton', false)
      .set('filter', null)
      .set('skip', 0)
      .set('sort', null)
      .set('shouldClientResetGridConfiguration', false);
  });
}
