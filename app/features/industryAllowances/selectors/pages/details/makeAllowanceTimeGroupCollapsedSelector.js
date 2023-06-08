import {createSelector} from 'reselect';
import allowanceTimeGroupsStatesSelector from './allowanceTimeGroupsStatesSelector';
import allowanceTimeTypeSelector from './allowanceTimeTypeSelector';

export default function () {
  return createSelector(
    allowanceTimeGroupsStatesSelector,
    allowanceTimeTypeSelector,
    (allowanceTimeGroupsStates, allowanceTimeType) => allowanceTimeGroupsStates.getIn([allowanceTimeType, 'collapsed'])
  );
}
