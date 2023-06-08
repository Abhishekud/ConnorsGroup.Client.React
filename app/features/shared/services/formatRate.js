import numeral from 'numeral';
import {convertFromTMUs} from '../../shared/services';

export default function (tmus, format) {
  const converted = convertFromTMUs(tmus, format);
  if (converted === 0) {
    return '';
  }
  const rate = numeral(Math.floor(1 / converted));
  return rate.format('0,0');
}
