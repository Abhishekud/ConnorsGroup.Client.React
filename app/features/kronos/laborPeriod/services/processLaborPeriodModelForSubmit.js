import {KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX} from '../../constants/KronosLaborPeriodTypes';

export default function (model) {
  let retModel = model;

  retModel = retModel.set('laborDistributionOffset',
    retModel.get('laborDistributionOffset') ? JSON.stringify(retModel.get('laborDistributionOffset').toJS()) : null);

  if (retModel.has('laborPeriodType')) {
    retModel.get('laborPeriodDays').forEach((day, index) => {
      switch (parseInt(retModel.get('laborPeriodType'), 10)) {
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_OPEN_HOURS:
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_CLOSE_HOURS:
          retModel = retModel
            .setIn(['laborPeriodDays', index, 'timeField1'], day.get('timeField1') ? JSON.stringify(day.get('timeField1').toJS()) : null)
            .setIn(['laborPeriodDays', index, 'timeField2'], day.get('timeField2') ? JSON.stringify(day.get('timeField2', null).toJS()) : null);
          break;
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.ABSOLUTE_HOURS:
          retModel = retModel
            .setIn(['laborPeriodDays', index, 'timeField1'], day.get('timeField1') ? JSON.stringify(day.get('timeField1').toJS()) : null)
            .setIn(['laborPeriodDays', index, 'timeField2'], day.get('timeField2') ? JSON.stringify(day.get('timeField2', null).toJS()) : null);
          break;
        case KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.OPERATION_HOURS:
          retModel = retModel
            .setIn(['laborPeriodDays', index, 'timeField1'], null)
            .setIn(['laborPeriodDays', index, 'timeField2'], null);
          break;
        default:
          break;
      }
    });
  }
  return retModel;
}
