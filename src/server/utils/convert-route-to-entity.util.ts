const mapping: Record<string, string> = {
  estimates: 'estimate',
  expenses: 'expense',
  organizations: 'organization',
  tasks: 'task',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
