import {createSelector} from 'reselect';
import elementsSelector from './elementsSelector';
import {formatTMUsTooltip} from '../../../../shared/services';
import {timeFormatSelector} from '../../../../shared/selectors/components/timeFormatSelector';


export default createSelector(
  elementsSelector,
  timeFormatSelector,
  (data, timeFormat) => {
    const elements = Object.values(data.toJS());
    elements.forEach((dataKey, primaryIndex) => {
      elements[primaryIndex].measuredTimeMeasurementUnits = parseFloat(formatTMUsTooltip((elements[primaryIndex].measuredTimeMeasurementUnits), timeFormat));
      elements[primaryIndex].elementTypeAbbreviated = elements[primaryIndex].elementType[0];
    });
    return elements;
  }
);

