import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import allowanceTimesSelector from './allowanceTimesSelector';
import allowanceTimeTypeSelector from './allowanceTimeTypeSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {EXCLUDED_PAID, INCLUDED_PAID_SCHEDULED} from '../../../../allowances/constants/allowanceTimeTypes';
import {Seq} from 'immutable';
import {allowanceDefinitions} from '../../../../allowances/constants';

function createExcludedPaidAllowanceTimeModel(allowanceTimes, allowanceTimeType, allowance) {

  const customAllowanceTimes = allowanceTimes
    .filter(at => at.type === allowanceTimeType)
    .sortBy(at => at.id)
    .valueSeq();

  return Seq([
    new AllowanceTimeModel({
      name: 'Excluded Paid Breaks',
      type: EXCLUDED_PAID,
      definition: allowanceDefinitions.EXCLUDED_PAID_BREAKS,
      minutes: allowance.excludedPaidBreaksMinutes,
    }),
  ]).concat(customAllowanceTimes).valueSeq().toArray();
}

function createIncludedPaidScheduledAllowanceTimeModel(allowanceTimes, allowanceTimeType, allowance) {

  const customAllowanceTimes = allowanceTimes
    .filter(at => at.type === allowanceTimeType)
    .sortBy(at => at.id)
    .valueSeq();

  return Seq([
    new AllowanceTimeModel({
      name: 'Included Paid Breaks',
      type: INCLUDED_PAID_SCHEDULED,
      definition: allowanceDefinitions.INCLUDED_PAID_BREAKS,
      minutes: allowance.includedPaidBreaksMinutes,
    }),
  ]).concat(customAllowanceTimes).valueSeq().toArray();
}

export default function () {
  return createSelector(
    allowanceSelector,
    allowanceTimesSelector,
    allowanceTimeTypeSelector,
    (allowance, allowanceTimes, allowanceTimeType) => {
      switch (allowanceTimeType) {
        case EXCLUDED_PAID:
          return createExcludedPaidAllowanceTimeModel(allowanceTimes, allowanceTimeType, allowance);

        case INCLUDED_PAID_SCHEDULED:
          return createIncludedPaidScheduledAllowanceTimeModel(allowanceTimes, allowanceTimeType, allowance);

        default:
          return allowanceTimes
            .filter(at => at.type === allowanceTimeType)
            .sortBy(at => at.id)
            .valueSeq()
            .toArray();
      }
    }
  );
}
