import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import {buildTimeCell, buildRateTimeCell} from '../../../../customizableGrid/services';
import {MINUTES} from '../../../../shared/constants/timeFormats';
import {timeFormatSelector} from '../../../../shared/selectors/components/timeFormatSelector';
import departmentNameSelector from '../../../../shared/selectors/components/settings/departmentNameSelector';
import locationNameSelector from '../../../../shared/selectors/components/settings/locationNameSelector';

export default createSelector(
  pageSelector,
  locationNameSelector,
  departmentNameSelector,
  timeFormatSelector,
  (page, locationLabel, departmentLabel, displayTimeFormat) => {
    const cellComponent = buildTimeCell(MINUTES, displayTimeFormat);
    const rateCellComponent = buildRateTimeCell(MINUTES, displayTimeFormat);
    return page
      .get('columns')
      .withMutations(s =>
        s.setIn(['locationName', 'title'], locationLabel)
          .setIn(['locationDescription', 'title'], `${locationLabel} Description`)
          .setIn(['departmentName', 'title'], departmentLabel)
          .setIn(['standardMinutes', 'cell'], cellComponent)
          .setIn(['standardRate', 'cell'], rateCellComponent)
          .setIn(['volumeDriverStandardMinutes', 'cell'], cellComponent)
          .setIn(['volumeDriverSampleValueStandardMinutes', 'cell'], cellComponent)
      );
  }
);
