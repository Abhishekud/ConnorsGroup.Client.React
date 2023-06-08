import {MINUTES_PER_TMU} from '../constants/tmuConversionFactors';

export default function (tmus) {
  return tmus * MINUTES_PER_TMU;
}
