import {createSelector} from 'reselect';
import selectedStandardsSelector from './selectedStandardsSelector';

const reducer = (reduction, value) => {
  reduction[value.get('status')] = value.get('status');
  return reduction;
};

// Search the selected standards to determine the selected statuses
export default createSelector(
  selectedStandardsSelector,
  standards => Object.keys(standards.reduce(reducer, {}))
);
