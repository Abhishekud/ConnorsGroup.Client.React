import {createSelector} from 'reselect';
import allowanceTimeSelector from './allowanceTimeSelector';
import allowanceTimesStatesSelector from './allowanceTimesStatesSelector';

export default function () {
  return createSelector(
    allowanceTimeSelector,
    allowanceTimesStatesSelector,
    (allowanceTime, allowanceTimesStates) => allowanceTimesStates.getIn([allowanceTime.id, 'editing'])
  );
}
