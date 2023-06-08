import numeral from 'numeral';
import {
  HOURS,
  MINUTES,
  SECONDS,
  TMUs,
} from '../constants/timeFormats';

export default function (time, format) {
  switch (format) {
    case TMUs:
      return `${numeral(time).format('0,0')}t`;

    case SECONDS:
      return `${numeral(time).format('0,0.00')}s`;

    case MINUTES:
      return `${numeral(time).format('0,0.000')}m`;

    case HOURS:
      return `${numeral(time).format('0,0.0000')}h`;

    default:
      return '';
  }
}
