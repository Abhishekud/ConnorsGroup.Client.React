import {OrderedSet} from 'immutable';

export const GENERAL = 'General';
export const CONTROL = 'Control';
export const TOOL_USE = 'ToolUse';
export const EQUIPMENT_USE = 'EquipmentUse';
export const PROCESS_TIME = 'ProcessTime';
export const ALL = new OrderedSet([GENERAL, CONTROL, TOOL_USE, EQUIPMENT_USE, PROCESS_TIME]);
export const BASIC_MOST = new OrderedSet([GENERAL, CONTROL, TOOL_USE, EQUIPMENT_USE, PROCESS_TIME]);
export const MINI_MOST = new OrderedSet([GENERAL, CONTROL, PROCESS_TIME]);

export function displayName(sequenceModelType) {
  switch (sequenceModelType) {
    case TOOL_USE:
      return 'Tool Use';

    case EQUIPMENT_USE:
      return 'Equipment Use';

    case PROCESS_TIME:
      return 'Process Time';

    default:
      return sequenceModelType;
  }
}
