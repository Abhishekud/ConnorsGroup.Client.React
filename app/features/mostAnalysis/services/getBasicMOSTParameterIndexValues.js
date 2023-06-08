import {
  GET,
  PUT,
  RETURN,
  MOVE_ACTUATE,
  GET_TOOL,
  PUT_TOOL,
  TOOL_ACTION,
  ASIDE_TOOL,
  GET_EQUIPMENT,
  PUT_EQUIPMENT,
  EQUIPMENT_ACTION,
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
          return [0, 1, 3, 6, 10, 16, 24, 32, 42, 54, 67, 81, 96, 113, 131, 152, 173, 196, 220, 245, 270, 300, 330];
        case 'G':
          return [0, 1, 3];
        case 'B':
          return [0, 3, 6, 10, 16];
        case 'P':
          return [0, 1, 3, 6];

        default:
          return [0];
      }

    case MOVE_ACTUATE:
      switch (mostParameterName) {
        case 'M':
        case 'X':
          return [0, 1, 3, 6, 10, 16, 24, 32, 42, 54, 67, 81, 96, 113, 131, 152, 173, 196, 220, 245, 270, 300, 330];

        case 'I':
          return [0, 1, 3, 6, 10, 16];

        default:
          return [0];
      }

    case RETURN:
      switch (mostParameterName) {
        case 'A':
          return [0, 1, 3, 6, 10, 16, 24, 32, 42, 54, 67, 81, 96, 113, 131, 152, 173, 196, 220, 245, 270, 300, 330];

        default:
          return [0];
      }

    case TOOL_ACTION:
    case EQUIPMENT_ACTION:
      switch (mostParameterName) {
        case 'A':
          return [0, 1, 3, 6, 10, 16, 24, 32, 42, 54, 67, 81, 96, 113, 131, 152, 173, 196, 220, 245, 270, 300, 330];

        case 'F':
        case 'L':
        case 'C':
        case 'R':
        case 'T':
        case 'W':
        case 'K':
        case 'H':
          return [0, 1, 3, 6, 10, 16, 24, 32, 42, 54];
        case 'S':
          return [0, 3, 6, 10, 16, 24, 32, 42];
        case 'M':
          return [0, 10, 16, 24, 32, 42, 54];

        default:
          return [0];
      }

    default:
      return [0];
  }
}
