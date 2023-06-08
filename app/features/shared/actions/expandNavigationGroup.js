export const EXPAND_NAVIGATION_GROUP = 'EXPAND_NAVIGATION_GROUP';

export function expandNavigationGroup(group) {
  return {
    type: EXPAND_NAVIGATION_GROUP,
    payload: {group},
  };
}
