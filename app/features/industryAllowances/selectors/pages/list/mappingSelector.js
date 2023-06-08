import {createSelector} from 'reselect';
import industryAllowancesSelector from './industryAllowancesSelector';
import {formatTMUsTooltip} from '../../../../shared/services';
import {timeFormatSelector} from '../../../../shared/selectors/components/timeFormatSelector';


export default createSelector(
  industryAllowancesSelector,
  timeFormatSelector,
  (data, timeFormat) => {
    const allowances = Object.values(data.toJS());
    allowances.forEach((dataKey, primaryIndex) => {
      allowances[primaryIndex].measuredTimeMeasurementUnits = parseFloat(formatTMUsTooltip((allowances[primaryIndex].measuredTimeMeasurementUnits), timeFormat));
    });
    return allowances;
  }
);

