import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {KRONOS_INTEGRATION} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(KRONOS_INTEGRATION)
);
