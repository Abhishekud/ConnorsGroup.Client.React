export const COLLAPSE_NAVIGATION_GROUP = 'COLLAPSE_NAVIGATION_GROUP';

export function collapseNavigationGroup(group) {
  return {
    type: COLLAPSE_NAVIGATION_GROUP,
    payload: {group},
  };
}
