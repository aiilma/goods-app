export function parseFilterValue(filterValue: string): { operator: string; value: string } {
  if (filterValue.startsWith('>=')) {
    return { operator: '>=', value: filterValue.substring(2).trim() };
  } else if (filterValue.startsWith('<=')) {
    return { operator: '<=', value: filterValue.substring(2).trim() };
  } else if (filterValue.startsWith('>')) {
    return { operator: '>', value: filterValue.substring(1).trim() };
  } else if (filterValue.startsWith('<')) {
    return { operator: '<', value: filterValue.substring(1).trim() };
  } else if (filterValue.startsWith('=')) {
    return { operator: '=', value: filterValue.substring(1).trim() };
  } else {
    return { operator: 'LIKE', value: `%${filterValue}%` };
  }
}