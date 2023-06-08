export const SHOW_MOST_STEP_APPLICATION_RULES_POPUP = 'SHOW_MOST_STEP_APPLICATION_RULES_POPUP';

export function showMOSTStepApplicationRulesPopup(
  mostType, mostStepId, toolUse, mostPhaseNumber, mostParameterNumber, mostParameterName, isToolAction) {
  return {
    type: SHOW_MOST_STEP_APPLICATION_RULES_POPUP,
    payload: {
      mostType,
      mostStepId,
      toolUse,
      mostPhaseNumber,
      mostParameterNumber,
      mostParameterName,
      isToolAction,
    },
  };
}
