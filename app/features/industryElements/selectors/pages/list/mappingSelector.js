import {createSelector} from 'reselect';
import industryElementsSelector from './industryElementsSelector';
import {formatTMUsTooltip} from '../../../../shared/services';
import {timeFormatSelector} from '../../../../shared/selectors/components/timeFormatSelector';


export default createSelector(
  industryElementsSelector,
  timeFormatSelector,
  (data, timeFormat) => {
    const elements = Object.values(data.toJS());
    elements.forEach((dataKey, primaryIndex) => {
      elements[primaryIndex].measuredTimeMeasurementUnits = parseFloat(formatTMUsTooltip((elements[primaryIndex].measuredTimeMeasurementUnits), timeFormat));
    });
    return elements;
  }
);

