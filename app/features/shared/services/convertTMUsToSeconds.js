import {SECONDS_PER_TMU} from '../constants/tmuConversionFactors';

export default function (tmus) {
  return tmus * SECONDS_PER_TMU;
}
