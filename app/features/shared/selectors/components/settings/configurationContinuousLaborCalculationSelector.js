import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {CONTINUOUS_LABOR_CALCULATION} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(CONTINUOUS_LABOR_CALCULATION, true)
);
