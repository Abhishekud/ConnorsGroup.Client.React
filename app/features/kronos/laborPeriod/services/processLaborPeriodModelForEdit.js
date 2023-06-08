import {KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX} from '../../constants/KronosLaborPeriodTypes';
import {fromJS} from 'immutable';

export default function (model) {
  let retModel = model;

  const laborDistributionOffset = retModel.get('laborDistributionOffset')
    ? JSON.parse(retModel.get('laborDistributionOffset'))
    : null;
  if (laborDistributionOffset) {
    laborDistributionOffset.minute = laborDistributionOffset.minute < 10 ? `0${laborDistributionOffset.minute}` : `${laborDistributionOffset.minute}`;
  }

  retModel = retModel.set('laborDistributionOffset',
    retModel.get('laborDistributionOffset') ? fromJS(laborDistributionOffset) : fromJS({hour: '', minute: ''}));

  if (retModel.has('laborPeriodType')) {
    retModel.get('laborPeriodDays').forEach((day, index) => {
      switch (parseInt(retModel.get('laborPeriodType'), 10)) {
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_OPEN_HOURS:
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_CLOSE_HOURS:
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.ABSOLUTE_HOURS: {

          const timeField1 = day.get('timeField1') ? JSON.parse(day.get('timeField1')) : null;
          const timeField2 = day.get('timeField1') ? JSON.parse(day.get('timeField2')) : null;

          if (timeField1) {
            timeField1.minute = timeField1.minute < 10 ? `0${timeField1.minute}` : `${timeField1.minute}`;
          }
          if (timeField2) {
            timeField2.minute = timeField2.minute < 10 ? `0${timeField2.minute}` : `${timeField2.minute}`;
          }

          retModel = retModel.withMutations(m => m
            .setIn(['laborPeriodDays', index, 'timeField1'], timeField1 ? fromJS(timeField1) : fromJS({hour: '', minute: ''}))
            .setIn(['laborPeriodDays', index, 'timeField2'], timeField2 ? fromJS(timeField2) : fromJS({hour: '', minute: ''}))
            .setIn(['laborPeriodDays', index, 'laborPeriodType'], parseInt(retModel.get('laborPeriodType'), 10))
          );
          break;
        }
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.OPERATION_HOURS:
          retModel = retModel.withMutations(m => m
            .setIn(['laborPeriodDays', index, 'timeField1'], fromJS({hour: '', minute: ''}))
            .setIn(['laborPeriodDays', index, 'timeField2'], fromJS({hour: '', minute: ''}))
            .setIn(['laborPeriodDays', index, 'laborPeriodType'], parseInt(retModel.get('laborPeriodType'), 10))
          );
          break;
        default:
          break;
      }
    });
  }
  return retModel;
}
