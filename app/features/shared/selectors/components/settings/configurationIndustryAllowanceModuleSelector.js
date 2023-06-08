import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {INDUSTRY_ALLOWANCE_MODULE} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(INDUSTRY_ALLOWANCE_MODULE)
);
