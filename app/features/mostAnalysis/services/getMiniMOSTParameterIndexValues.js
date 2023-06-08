import {
  GET,
  PUT,
  RETURN,
  MOVE_ACTUATE,
  GET_TOOL,
  PUT_TOOL,
  ASIDE_TOOL,
  GET_EQUIPMENT,
  PUT_EQUIPMENT,
  ASIDE_EQUIPMENT,
} from '../constants/mostPhaseNames';

export default function (mostPhaseName, mostParameterName) {
  switch (mostPhaseName) {
    case GET:
    case GET_TOOL:
    case GET_EQUIPMENT:
    case PUT:
    case PUT_TOOL:
    case ASIDE_TOOL:
    case PUT_EQUIPMENT:
    case ASIDE_EQUIPMENT:
      switch (mostParameterName) {
        case 'A':
          return [0, 1, 3, 6, 10, 16, 24, 32];

        case 'G':
          return [0, 3, 6, 10, 16, 24];

        case 'B':
          return [0, 10, 32, 42];

        case 'P':
          return [0, 3, 6, 10, 16];

        default:
          return [0];
      }

    case MOVE_ACTUATE:
      switch (mostParameterName) {
        case 'M':
          return [0, 3, 6, 10, 16, 24, 32, 42, 54];

        case 'X':
          return [0, 1, 3, 6, 10, 16, 24, 32, 42, 54];

        case 'I':
          return [0, 6, 10, 16, 24, 32];

        default:
          return [0];
      }

    case RETURN:
      switch (mostParameterName) {
        case 'A':
          return [0, 1, 3, 6, 10, 16, 24, 32];

        default:
          return [0];
      }

    default:
      return [0];
  }
}
