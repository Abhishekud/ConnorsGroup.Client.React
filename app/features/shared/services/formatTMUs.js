import numeral from 'numeral';
import convertTMUsToHours from './convertTMUsToHours';
import convertTMUsToMinutes from './convertTMUsToMinutes';
import convertTMUsToSeconds from './convertTMUsToSeconds';
import {
  HOURS,
  MINUTES,
  SECONDS,
  TMUs,
} from '../constants/timeFormats';

export default function (tmus, format) {
  switch (format) {
    case TMUs:
      return `${numeral(tmus).format('0,0')}t`;

    case SECONDS:
      return `${numeral(convertTMUsToSeconds(tmus)).format('0,0.00')}s`;

    case MINUTES:
      return `${numeral(convertTMUsToMinutes(tmus)).format('0,0.000')}m`;

    case HOURS:
      return `${numeral(convertTMUsToHours(tmus)).format('0,0.0000')}h`;

    default:
      return '';
  }
}
