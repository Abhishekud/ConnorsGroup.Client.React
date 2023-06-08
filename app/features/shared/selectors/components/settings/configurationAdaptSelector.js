import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {ADAPT_INTEGRATION} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(ADAPT_INTEGRATION)
);
