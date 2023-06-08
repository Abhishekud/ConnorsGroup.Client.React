import {STATUS_ORDER} from '../constants/standardStatuses';

export default function (standardElements) {
  for (const status of STATUS_ORDER) {
    if (standardElements.some(se => se.get('elementStatus') === status)) return status;
  }
  return '';
}
