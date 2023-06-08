import {UNIT_OF_TIME} from '../../adminTools/constants/settingTypes';
import {SECONDS} from '../constants/timeFormats';

export default function setTimeFormat(settings, changeTimeFormat) {
  const unitOfTime = settings.find(x => x.settingValueType === UNIT_OF_TIME)?.value;
  changeTimeFormat(unitOfTime ?? SECONDS);
}
