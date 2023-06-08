import {createSelector} from 'reselect';
import allowanceTimeGroupsStatesSelector from './allowanceTimeGroupsStatesSelector';

export default function (allowanceTimeType) {
  return createSelector(
    allowanceTimeGroupsStatesSelector,
    allowanceTimeGroupsStates => allowanceTimeGroupsStates.getIn([allowanceTimeType, 'collapsed'])
  );
}
