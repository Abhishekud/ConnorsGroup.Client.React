import {
  KEYBOARD,
  KEYPAD,
  HANDLING,
} from '../constants/equipmentTypes';

export default function (toolType) {
  switch (toolType) {
    case KEYBOARD:
      return 'W';

    case KEYPAD:
      return 'K';

    case HANDLING:
      return 'H';

    default:
      throw new Error(`Unknown Equipment Type ${toolType}`);
  }
}
